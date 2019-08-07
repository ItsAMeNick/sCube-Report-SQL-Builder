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

        sql_text += from_text;

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

    genFromClause(tables_used) {
        let text = "";
        if (tables_used.length >= 1) {
            text += "FROM " + schema[tables_used[0]].table_name + " " + schema[tables_used[0]].shortname + "\n";

            for (let t = 1; t < tables_used.length; t++) {
                text += "LEFT JOIN " + schema[tables_used[t]].table_name + " " + schema[tables_used[t]].shortname + "\n";

                let conditions = [];
                //Add On clause
                for (let i in schema[tables_used[t]].table_name);

                //Add the Filters
                let filters = this.props.state.filters;
                for (let f in filters) {
                    console.log(f);
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
            <textarea rows="10" style={{width: "100%", fontFamily: "\"Courier New\", Courier, monospace"}} value={this.generateSQL()} readOnly={true} />
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
