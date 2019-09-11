import React, { Component } from 'react';
import { connect } from "react-redux";

import accela_schema from "./accela_schema.js";
let schema = accela_schema.accela_data;

class CORE_Output extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateSQL() {
        let sql_text = "";
        let shortnames = this.genShortnames();

        let select_text = this.genSelectClause(shortnames);
        let from_text = this.genFromClause(shortnames);
        let where_text = this.genWhereClause(shortnames);

        sql_text += select_text;
        sql_text += from_text;
        sql_text += where_text;

        if (sql_text !== this.props.query) this.props.setQuery(sql_text);
        return sql_text;
    }

    genShortnames() {
        let shortnames = [];

        for (let g in this.props.state.groups) {
            shortnames.push({
                table: this.props.state.groups[g].table,
                group: this.props.state.groups[g].key,
                shortname: schema[this.props.state.groups[g].table].shortname+g
            });
        }

        //Prioritize B1PERMIT
        shortnames = shortnames.sort((a,b) => {
            if (a.table === "Permit Information") {
                return -1;
            }
            return 0;
        })

        return shortnames;
    }

    genFromClause(tables) {
        let text = "";
        let from_table = null;
        for (let i in tables) {
            let group = this.props.state.groups[tables[i].group];
            if (!from_table) {
                text += "FROM " + schema[tables[i].table].table_name + " " + tables[i].shortname + "\n";
                from_table = i;
            } else {
                if (this.props.state.groups[tables[i].group].fields.size) { //If this is in a group with field data
                    text += "LEFT JOIN " + schema[tables[i].table].table_name + " " + tables[i].shortname + "\n";
                } else {
                    text += "JOIN " + schema[tables[i].table].table_name + " " + tables[i].shortname + "\n";
                }

                //Add Avaliable Joins
                let flag = false;
                for (let jc in schema[tables[from_table].table].join_clause) {
                    if (schema[tables[from_table].table].join_clause.includes(schema[tables[i].table].join_clause[jc])) {
                        if (!flag) {
                            text += "ON  ";
                            flag = true;
                        } else {
                            text += "AND ";
                        }
                        text +=  tables[i].shortname + "." + schema[tables[i].table].join_clause[jc] + " = " + tables[from_table].shortname + "." + schema[tables[i].table].join_clause[jc] + "\n";
                    }
                }

                //Add the Filters
                let filters = Array.from(group.filters);
                for (let f in filters) {
                    let filter = this.props.state.filters[filters[f]];
                    if (!filter) continue;
                    if (filter.table && (filter.table === tables[i].table) && filter.field) {
                        if (!flag) {
                            text += "ON ";
                            flag = true;
                        } else {
                            text += "AND ";
                        }

                        if (filter.req) {
                            text += tables[i].shortname + "." + schema[tables[i].table].required[filter.field].table_key;
                        } else {
                            text += tables[i].shortname + "." + schema[tables[i].table].data[filter.field].table_key;
                        }

                        switch (filter.comparison) {
                            case "==": {
                                text += " = ";
                                break;
                            }
                            case "!=": {
                                text += " != ";
                                break;
                            }
                            default: break;
                        }
                        text += "'" + filter.value + "'";

                        text += "\n";
                    }
                }

                //Add the Parameters
                let parameters = Array.from(group.parameters);
                for (let p in parameters) {
                    let param = this.props.state.parameters[parameters[p]];
                    if (param.table && param.field) {
                        if (!flag) {
                            text += "ON  ";
                            flag = true;
                        } else {
                            text += "AND ";
                        }

                        text += tables[i].shortname + "." + schema[param.table].data[param.field].table_key;

                        switch (param.comparison) {
                            case "==": {
                                text += " = ";
                                break;
                            }
                            case "!=": {
                                text += " != ";
                                break;
                            }
                            default: break;
                        }

                        let param_placeholder = "";
                        if (this.props.state.report_type === "SSRS") {
                            param_placeholder = "@" + param.parameter_name.replace(/\W/g, '_');
                        } else if (this.props.state.report_type === "Crystal") {
                            param_placeholder = "{?" + param.parameter_name.replace(/\W/g, '_') + "}";
                        } else {
                            param_placeholder = "{?" + param.parameter_name.replace(/\W/g, '_') + "} --Unspecified Report Type";
                        }

                        switch (param.data_type) {
                            case "Text": {
                                text += param_placeholder;
                                break;
                            }
                            case "Number": {
                                text += param_placeholder;
                                break;
                            }
                            case "Date": {
                                text += param_placeholder;
                                break;
                            }
                            default: break;
                        }
                        text += "\n";
                    }
                }
            }
            text += "\n";
        }
        return text;
    }

    genSelectClause(tables) {
        let text = "SELECT\n  ";
        let flag = false;
        for (let i in tables) {
            let group = this.props.state.groups[tables[i].group];
            let fields = Array.from(group.fields);
            for (let f in fields) {
                let field = this.props.state.fields[fields[f]];
                if (!field.table || !field.field) break;
                if (field.table === tables[i].table) {
                    if (flag) text += ", ";
                    flag = true;

                    if (field.field) {
                        text += tables[i].shortname + "." +  schema[tables[i].table].data[field.field].table_key + " as " + field.report + "\n";
                    }
                }
            }
        }
        text += "\n";
        return text;
    }

    genWhereClause(tables) {
        if (Object.keys(tables).length < 1) return "";

        let text = "";
        let flag = false;

        let group = this.props.state.groups[tables[0].group];

        //Add the Filters
        let filters = Array.from(group.filters);
        for (let f in filters) {
            let filter = this.props.state.filters[filters[f]];
            if (!filter) continue;
            if (filter.table && (filter.table === tables[0].table) && filter.field) {
                if (!flag) {
                    text += "WHERE ";
                    flag = true;
                } else {
                    text += "AND   ";
                }

                if (filter.req) {
                    text += tables[0].shortname + "." + schema[tables[0].table].required[filter.field].table_key;
                } else {
                    text += tables[0].shortname + "." + schema[tables[0].table].data[filter.field].table_key;
                }

                switch (filter.comparison) {
                    case "==": {
                        text += " = ";
                        break;
                    }
                    case "!=": {
                        text += " != ";
                        break;
                    }
                    default: break;
                }
                text += "'" + filter.value + "'";

                text += "\n";
            }
        }

        //Add the Parameters
        let parameters = Array.from(group.parameters);
        for (let p in parameters) {
            let param = this.props.state.parameters[parameters[p]];
            if (param.table && param.field) {
                if (!flag) {
                    text += "WHERE ";
                    flag = true;
                } else {
                    text += "AND   ";
                }

                text += tables[0].shortname + "." + schema[param.table].data[param.field].table_key;

                switch (param.comparison) {
                    case "==": {
                        text += " = ";
                        break;
                    }
                    case "!=": {
                        text += " != ";
                        break;
                    }
                    default: break;
                }

                let param_placeholder = "";
                if (this.props.state.report_type === "SSRS") {
                    param_placeholder = "@" + param.parameter_name.replace(/\W/g, '_') + "\n";
                } else if (this.props.state.report_type === "Crystal") {
                    param_placeholder = "{?" + param.parameter_name.replace(/\W/g, '_') + "}\n";
                } else {
                    param_placeholder = "{?" + param.parameter_name.replace(/\W/g, '_') + "} --Unspecified Report Type (Setting parameter for Crystal)";
                }

                switch (param.data_type) {
                    case "Text": {
                        text += param_placeholder;
                        break;
                    }
                    case "Number": {
                        text += param_placeholder;
                        break;
                    }
                    case "Date": {
                        text += param_placeholder;
                        break;
                    }
                    default: break;
                }

                text += "\n";
            }
        }

        return text;
    }

    render() {
        return (
        <div>
            <hr/>
            <textarea rows="20" style={{width: "100%", fontFamily: "\"Courier New\", Courier, monospace"}} value={this.generateSQL()} readOnly={true}/>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state,
    query: state.query
});

const mapDispatchToProps = dispatch => ({
    setQuery: (query) => dispatch({
        type: "set_query",
        payload: query
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Output);
