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
        let tables_used = this.getTablesUsed();
        let from_text = this.genFromClause(tables_used);
        let select_text = this.genSelectClause(tables_used);
        let where_text = this.genWhereClause(tables_used);

        sql_text += select_text;
        sql_text += from_text;
        sql_text += where_text;

        return sql_text;
    }

    getTablesUsed() {
        let tables = [];

        //Get tables from fields
        let fields = this.props.state.fields;
        for(let f in fields) {
            if (!fields[f].table) continue;
            if (!tables.includes(fields[f].table)) tables.push(fields[f].table);
        }

        //Get tables from filters
        let filters = this.props.state.filters;
        for(let f in filters) {
            if (!filters[f].table_name) continue;
            if (!tables.includes(filters[f].table_name)) tables.push(filters[f].table_name);
        }

        //Prioritize B1PERMIT
        tables = tables.sort((a,b) => {
            if (a === "Permit Information") {
                return -1;
            }
            return 0;
        })

        return tables;
    }

    genFromClause(tables) {
        let text = "";
        if (tables.length >= 1) {
            text += "FROM " + schema[tables[0]].table_name + " " + schema[tables[0]].shortname + "\n";
            text += "\n";

            for (let t = 1; t < tables.length; t++) {
                text += "LEFT JOIN " + schema[tables[t]].table_name + " " + schema[tables[t]].shortname + "\n";

                let req_conditions = [];
                //Add On clause
                for (let i in schema[tables[t]].join_clause) {
                    if (schema[tables[0]].join_clause.includes(schema[tables[t]].join_clause[i])) {
                        req_conditions.push(schema[tables[t]].join_clause[i]);
                    }
                }

                for (let c in req_conditions) {
                    if (c === "0") {
                        text += "ON ";
                    } else {
                        text += "AND ";
                    }
                    text +=  schema[tables[t]].shortname + "." + req_conditions[c] + " = " + schema[tables[0]].shortname + "." + req_conditions[c] + "\n";
                }

                //Add the Filters
                let filters = this.props.state.filters;
                for (let f in filters) {
                    let filter = filters[f];
                    if (filter.table_name && (filter.table_name === tables[t]) && filter.field_name) {
                        if (req_conditions.length <=1) {
                            text += "ON ";
                        } else {
                            text += "AND ";
                        }

                        if (filter.req) {
                            text += schema[filter.table_name].shortname + "." + schema[filter.table_name].required[filter.field_name].table_key;
                        } else {
                            text += schema[filter.table_name].shortname + "." + schema[filter.table_name].data[filter.field_name].table_key;
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


                text += "\n";
            }
        }
        return text;
    }

    genSelectClause(tables) {
        let text = "SELECT\n  ";
        let flag = false;
        for (let t in tables) {
            for (let f in this.props.state.fields) {
                let field = this.props.state.fields[f];
                if (!field.table || !field.field) continue;
                if (field.table === tables[t]) {
                    if (flag) text += ", ";
                    flag = true;

                    if (field.field) {
                        text += schema[tables[t]].shortname + "." +  schema[tables[t]].data[field.field].table_key + " as " + schema[tables[t]].data[field.field].name + "\n";
                    }
                }
            }
        }
        text += "\n";
        return text;
    }

    genWhereClause(tables) {
        let text = "WHERE\n";
        let flag = false;
        let table = tables[0];

        //Check Filters
        for (let f in this.props.state.filters) {
            let filter = this.props.state.filters[f];
            if (!filter.table_name || !filter.field_name) continue;
            if (filter.table_name === table) {
                if (flag) text += "AND ";
                flag = true;

                if (filter.req) {
                    text += schema[filter.table_name].shortname + "." + schema[filter.table_name].required[filter.field_name].table_key;
                } else {
                    text += schema[filter.table_name].shortname + "." + schema[filter.table_name].data[filter.field_name].table_key;
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
                text += "'" + filter.value + "'\n";
            }
        }

        //Check Parameters
        for (let p in this.props.state.parameters) {
            let param = this.props.state.parameters[p];
            if (!param.table_param || !param.field_param) continue;
            console.log(param.table_param)
            if (param.table_param === table) {
                console.log("Param");
                if (flag) text += "AND ";
                flag = true;


                text += schema[param.table_param].shortname + "." + schema[param.table_param].data[param.field_param].table_key;

                text += " = ";

                switch (param.data_type) {
                    case "Text": {
                        break;
                    }
                    case "Number": {
                        break;
                    }
                    case "Date": {
                        break;
                    }
                    default: break;
                }
                text += "{@" + param.parameter_name + "}\n";
            }
        }

        return text;
    }

    render() {
        return (
        <div>
            <hr/>
            <textarea rows="20" style={{width: "100%", fontFamily: "\"Courier New\", Courier, monospace"}} value={this.generateSQL()} readOnly={true} />
        </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Output);
