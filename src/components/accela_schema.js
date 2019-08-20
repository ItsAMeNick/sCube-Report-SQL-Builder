var accela_data = {
    "Permit Information": {
        table_name: "B1PERMIT",
        shortname: "b1",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
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
            },
            "Service Provider Code": {
                table_key: "SERV_PROV_CODE",
                name: "SVP"
            },
            "Application Status": {
                table_key: "B1_APPL_STATUS",
                name: "Status"
            },
            "Application Status Date": {
                table_key: "B1_APPL_STATUS_DATE",
                name: "Status_Date"
            }
        }
    },
    "Address Information": {
        table_name: "B3ADDRES",
        shortname: "addres",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
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
    "Parcel Information": {
        table_name: "B3PARCEL",
        shortname: "parcel",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: null,
        data: {
            "ID": {
                table_key: "B1_PARCEL_NBR",
                name: "Parcel_ID"
            },
            "Lot": {
                table_key: "B1_LOT",
                name: "Parcel_Lot"
            },
            "Block": {
                table_key: "B1_BLOCK",
                name: "Parcel_Block"
            },
            "Subdivision": {
                table_key: "B1_SUBDIVISION",
                name: "Parcel_Subdivision"
            }
        }
    },
    "ASI Field": {
        table_name: "BCHCKBOX",
        shortname: "asi",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: {
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
    "Contact Information": {
        table_name: "B3CONTACT",
        shortname: "contact",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: {
            "Contact Type": {
                table_key: "B1_CONTACT_TYPE",
                name: "Contact_Type"
            }
        },
        data: {
            "First Name": {
                table_key: "B1_FNAME",
                name: "First_Name"
            },
            "Middle Name": {
                table_key: "B1_MNAME",
                name: "Middle_Name"
            },
            "Last Name": {
                table_key: "B1_LNAME",
                name: "Last_Name"
            }
        }
    },
    "Standard Choice": {
        table_name: "RBIZDOMAIN_VALUE",
        shortname: "std",
        parent: null,
        join_clause: ["SERV_PROV_CODE"],
        required: {
            "STDC Group": {
                table_key: "BIZDOMAIN",
                name: "Choice Group"
            },
            "STDC Field": {
                table_key: "BIZDOMAIN_VALUE",
                name: "STD Choice"
            }
        },
        data: {
            "Value": {
                table_key: "VALUE_DESC",
                name: "STD_Value"
            }
        }
    },
    "Fee": {
        table_name: "F4FEEITEM",
        shortname: "fee",
        parent: null,
        join_clause: ["SERV_PROV_CODE", "B1_PER_ID1", "B1_PER_ID2", "B1_PER_ID3"],
        required: {
            "Fee Item": {
                table_key: "GF_COD",
                name: "Fee_Code"
            }
        },
        data: {
            "Description": {
                table_key: "GF_DES",
                name: "Fee_Description"
            },
            "Schedule": {
                table_key: "GF_FEE_SCHEDULE",
                name: "Fee_Schedule"
            },
            "Value": {
                table_key: "GF_FEE",
                name: "Fee_Val"
            },
            "Status": {
                table_key: "GF_ITEM_STATUS_FLAG",
                name: "Fee_Status"
            }
        }
    },
}

export default {accela_data};
