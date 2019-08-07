var accela_data = {
    "Permit Information": {
        table_name: "B1PERMIT",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        required: [],
        data: {
            "Record ID": {
                table_key: "B1_ALT_ID",
                name: "Record_ID"
            }
        }
    },
    "Address Information": {
        table_name: "B3ADDRES",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        required: [],
        data: {
            "Street Name": {
                table_key: "B1_STR_NAME",
                name: "Street_Name"
            }
        }
    },
    "ASI Field": {
        table_name: "BCHCKBOX",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        required: ["ASI Group", "ASI Field Name"],
        data: {
            "ASI Group": {
                table_key: "B1_CHECKBOX_TYPE",
                name: "ASI_Group"
            },
            "ASI Field Name": {
                table_key: "B1_CHECKBOX_DESC",
                name: "ASI_Field"
            },
            "ASI Field Value": {
                table_key: "B1_CHECKLIST_COMMENT",
                name: "ASI_Value"
            }
        }
    },
    "Table Name Seen By User": {
        table_name: "ACCELA TABLE NAME",
        parent: "My Parent's user friendly name, who would you need to join through",
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        required: ["REQUIRED fields from data to make this join"],
        data: {
            "User friendly field name": {
                table_key: "table key",
                name: "base for my report reference name"
            }
        }
    }
}

export default {accela_data};
