var accela_data = {
    "Permit Information": {
        table_name: "B1PERMIT",
        shortname: "b1",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        required: null,
        data: {
            "Record ID": {
                table_key: "B1_ALT_ID",
                name: "Record_ID"
            },
            "Module": {
                table_key: "B1_PER_Group",
                name: "Record_Module"
            },
            "Type": {
                table_key: "B1_PER_TYPE",
                name: "Record_Type"
            },
            "Subtype": {
                table_key: "B1_PER_SUB_TYPE",
                name: "Record_Subtype"
            },
            "Category": {
                table_key: "B1_PER_CATEGORY",
                name: "Record_Category"
            }
        }
    },
    "Address Information": {
        table_name: "B3ADDRES",
        shortname: "addres",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        required: null,
        data: {
            "Street Number": {
                table_key: "B1_HSE_NBR_START",
                name: "Street_Number"
            },
            "Street Direction": {
                table_key: "B1_STR_DIR",
                name: "Street_Direction"
            },
            "Street Name": {
                table_key: "B1_STR_NAME",
                name: "Street_Name"
            },
            "Street Type": {
                table_key: "B1_STR_SUFFIX",
                name: "Street_Type"
            },
            "Unit Number": {
                table_key: "B1_UNIT_START",
                name: "Unit_Number"
            },
            "Unit Type": {
                table_key: "B1_UNIT_TYPE",
                name: "Unit_Type"
            },"City": {
                table_key: "B1_SITUS_CITY",
                name: "CSZ_City"
            },
            "State": {
                table_key: "B1_SITUS_STATE",
                name: "CSZ_State"
            },
            "Zip": {
                table_key: "B1_SITUS_ZIP",
                name: "CSZ_Zip"
            }
        }
    },
    "ASI Field": {
        table_name: "BCHCKBOX",
        shortname: "asi",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        required: {
            "ASI Group": {
                table_key: "B1_CHECKBOX_TYPE",
                name: "ASI_Group"
            },
            "ASI Field Name": {
                table_key: "B1_CHECKBOX_DESC",
                name: "ASI_Field"
            }
        },
        data: {
            "ASI Field Value": {
                table_key: "B1_CHECKLIST_COMMENT",
                name: "ASI_Value"
            }
        }
    },
    "Table Name Seen By User": {
        table_name: "ACCELA TABLE NAME",
        shortname: "short",
        parent: "My Parent's user friendly name, who would you need to join through",
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        required: {
            "User friendly field name": {
                table_key: "table key",
                name: "base for my report reference name"
            }
        },
        data: {
            "User friendly field name": {
                table_key: "table key",
                name: "base for my report reference name"
            }
        }
    }
}

export default {accela_data};
