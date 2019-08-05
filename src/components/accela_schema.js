var accela_data = {
    "Permit Information": {
        table_name: "B1PERMIT",
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        data: {
            "Record ID": {
                table_key: "B1_ALT_ID",
                name: "Record_ID"
            }
        }
    },
    "Address Information": {
        table_name: "B3ADDRES",
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID", "B1_PER_I2", "B1_PER_ID3"],
        data: {
            "Street_Name": {
                table_key: "B1_STR_NAME",
                name: "Street_Name"
            }
        }
    }
}
