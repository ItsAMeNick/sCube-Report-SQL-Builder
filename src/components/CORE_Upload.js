import React, { Component } from 'react';
import { connect } from "react-redux";

import jszip from "jszip";
import fxp from "fast-xml-parser";

class CORE_Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (event.target.files[0] && event.target.files[0].type === "application/x-zip-compressed") {
            jszip.loadAsync(event.target.files[0]).then(zip => {
                let file_names = Object.keys(zip.files).filter(f => {
                    return !zip.files[f].dir
                });
                for (let f in file_names) {
                    let file = zip.files[file_names[f]]
                    file.async("text").then(file_text => {
                        switch(file_names[f]) {
                            case "CapTypeModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.capType;
                                console.log(rawJSON);
                                let filteredJSON = [];
                                if (!Object.keys(rawJSON).includes("0")) {
                                    this.props.update("svp", rawJSON.serviceProviderCode);
                                    let cap = rawJSON;
                                    filteredJSON.push({
                                        key: filteredJSON.length,
                                        module: cap.group,
                                        type: cap.type,
                                        subtype: cap.subType,
                                        category: cap.category,
                                        alias: cap.alias,
                                        asi_code: cap.specInfoCode,
                                        fee_code: cap.feeScheduleName,
                                        insp_code: cap.inspectionGroupCode ? cap.inspectionGroupCode : null,
                                        doc_code: cap.docCode ? cap.docCode : null,
                                    });
                                } else {
                                    this.props.update("svp", rawJSON["0"].serviceProviderCode);
                                    for (let i in rawJSON) {
                                        let cap = rawJSON[i];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            module: cap.group,
                                            type: cap.type,
                                            subtype: cap.subType,
                                            category: cap.category,
                                            alias: cap.alias,
                                            asi_code: cap.specInfoCode,
                                            fee_code: cap.feeScheduleName,
                                            insp_code: cap.inspectionGroupCode ? cap.inspectionGroupCode : null,
                                            doc_code: cap.docCode ? cap.docCode : null,
                                        });
                                    }
                                }
                                this.props.update("caps", filteredJSON);
                                break;
                            }
                            case "ASIGroupModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.asiGroup;
                                let filteredJSON = [];
                                if (!Object.keys(rawJSON).includes("0")) {
                                    for (let a in rawJSON.asiModels.asiModel) {
                                        let asi = rawJSON.asiModels.asiModel[a];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            code: asi.r1CheckboxCode,
                                            name: asi.r1CheckboxDesc,
                                            group: asi.r1CheckboxGroup,
                                            type: asi.r1CheckboxType,
                                            alias: asi.subGroupAlias
                                        });
                                    }
                                } else {
                                    for (let i in rawJSON) {
                                        for (let a in rawJSON[i].asiModels.asiModel) {
                                            if (!Object.keys(rawJSON[i].asiModels.asiModel).includes("0")) {
                                                let asi = rawJSON[i].asiModels.asiModel;
                                                filteredJSON.push({
                                                    key: filteredJSON.length,
                                                    code: asi.r1CheckboxCode,
                                                    name: asi.r1CheckboxDesc,
                                                    group: asi.r1CheckboxGroup,
                                                    type: asi.r1CheckboxType,
                                                    alias: asi.subGroupAlias
                                                });
                                                break;
                                            } else {
                                                let asi = rawJSON[i].asiModels.asiModel[a];
                                                filteredJSON.push({
                                                    key: filteredJSON.length,
                                                    code: asi.r1CheckboxCode,
                                                    name: asi.r1CheckboxDesc,
                                                    group: asi.r1CheckboxGroup,
                                                    type: asi.r1CheckboxType,
                                                    alias: asi.subGroupAlias
                                                });
                                            }
                                        }
                                    }
                                }
                                this.props.update("asis", filteredJSON);
                                break;
                            }
                            case "RefFeeScheduleModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.refFeeSchedule;
                                let filteredJSON = [];
                                if (!Object.keys(rawJSON).includes("0")) {
                                    for (let f in rawJSON.refFeeItemModels.refFeeItem) {
                                        let fee = rawJSON.refFeeItemModels.refFeeItem[f];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            schedule: fee.feeScheduleName,
                                            code: fee.feeCod,
                                            desc: fee.feeDes
                                        });
                                    }
                                } else {
                                    for (let i in rawJSON) {
                                        for (let f in rawJSON[i].refFeeItemModels.refFeeItem) {
                                            let fee = rawJSON[i].refFeeItemModels.refFeeItem[f];
                                            filteredJSON.push({
                                                key: filteredJSON.length,
                                                schedule: fee.feeScheduleName,
                                                code: fee.feeCod,
                                                desc: fee.feeDes
                                            });
                                        }
                                    }
                                }
                                this.props.update("fees", filteredJSON);
                                break;
                            }

                            case "NotificationTemplateModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.notificationTemplate;
                                let filteredJSON = [];
                                if (!Object.keys(rawJSON).includes("0")) {
                                    let note = rawJSON.emailTemplate;
                                    filteredJSON.push({
                                        key: filteredJSON.length,
                                        template: note.templateName,
                                        from: note.from,
                                    });
                                } else {
                                    for (let i in rawJSON) {
                                        let note = rawJSON[i].emailTemplate;
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            template: note.templateName,
                                            from: note.from,
                                        });
                                    }
                                }
                                this.props.update("notes", filteredJSON);
                                break;
                            }

                            case "InspectionGroupModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.inspectionGroup;
                                let filteredJSON = [];
                                console.log(rawJSON);
                                if (!Object.keys(rawJSON).includes("0")) {
                                    for (let ii in rawJSON.inspectionTypeModels.inspectionTypeModel) {
                                        let insp = rawJSON.inspectionTypeModels.inspectionTypeModel[ii];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            code: insp.inspCode,
                                            group: insp.inspGroupName,
                                            result: insp.inspResultGroup,
                                            type: insp.inspType,
                                            guidesheet: insp.guideGroup,
                                        });
                                    }
                                } else {
                                    for (let i in rawJSON) {
                                        for (let ii in rawJSON[i].inspectionTypeModels.inspectionTypeModel) {
                                            let insp = rawJSON[i].inspectionTypeModels.inspectionTypeModel[ii];
                                            filteredJSON.push({
                                                key: filteredJSON.length,
                                                code: insp.inspCode,
                                                group: insp.inspGroupName,
                                                result: insp.inspResultGroup,
                                                type: insp.inspType,
                                                guidesheet: insp.guideGroup,
                                            });
                                        }
                                    }
                                }
                                this.props.update("inspections", filteredJSON);
                                break;
                            }

                            case "RefInspectionResultGroupModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.refInspResultGroup;
                                let filteredJSON = [];
                                if (!Object.keys(rawJSON).includes("0")) {
                                    for (let ii in rawJSON.inspectionResultGroupModels.inspectionResultGroupModel) {
                                        let insp = rawJSON.inspectionResultGroupModels.inspectionResultGroupModel[ii];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            group: insp.inspResultGroup,
                                            result: insp.inspResult,
                                            type: insp.inspResultType
                                        });
                                    }
                                } else {
                                    for (let i in rawJSON) {
                                        for (let ii in rawJSON[i].inspectionResultGroupModels.inspectionResultGroupModel) {
                                            let insp = rawJSON[i].inspectionResultGroupModels.inspectionResultGroupModel[ii];
                                            filteredJSON.push({
                                                key: filteredJSON.length,
                                                group: insp.inspResultGroup,
                                                result: insp.inspResult,
                                                type: insp.inspResultType
                                            });
                                        }
                                    }
                                }
                                this.props.update("inspection_results", filteredJSON);
                                break;
                            }

                            case "GuideSheetModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.guideSheet;
                                console.log(rawJSON);
                                let filteredJSON = [];
                                if (!Object.keys(rawJSON).includes("0")) {
                                    for (let ii in rawJSON.GuideSheetItems.GuideSheetItem) {
                                        let sheet = rawJSON.GuideSheetItems.GuideSheetItem[ii];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            asi_group: sheet.asiGroupName,
                                            group: sheet.guideItemStatusGroupName,
                                            type: sheet.guideType
                                        });
                                    }
                                } else {
                                    for (let i in rawJSON) {
                                        for (let ii in rawJSON[i].GuideSheetItems.GuideSheetItem) {
                                            let sheet = rawJSON[i].GuideSheetItems.GuideSheetItem[ii];
                                            filteredJSON.push({
                                                key: filteredJSON.length,
                                                asi_group: sheet.asiGroupName,
                                                group: sheet.guideItemStatusGroupName,
                                                type: sheet.guideType
                                            });
                                        }
                                    }
                                }
                                console.log(filteredJSON);
                                this.props.update("checklists", filteredJSON);
                                break;
                            }

                            case "RefDocumentModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.refDocument;
                                let filteredJSON = [];
                                if (!Object.keys(rawJSON).includes("0")) {
                                    let doc = rawJSON;
                                    filteredJSON.push({
                                        key: filteredJSON.length,
                                        code: doc.docCode,
                                        type: doc.documentType,
                                    });
                                } else {
                                    for (let i in rawJSON) {
                                        let doc = rawJSON[i];
                                        filteredJSON.push({
                                            key: filteredJSON.length,
                                            code: doc.docCode,
                                            type: doc.documentType,
                                        });
                                    }
                                }
                                this.props.update("doc_types", filteredJSON);
                                break;
                            }

                            case "StandardChoiceModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.standardChoice;
                                for (let i in rawJSON) {
                                    switch(rawJSON[i].name) {
                                        case "CONTACT TYPE": {
                                            let filteredJSON = []
                                            for (let s in rawJSON[i].standardChoiceValueModels.standardChoiceValue) {
                                                let std = rawJSON[i].standardChoiceValueModels.standardChoiceValue[s];
                                                filteredJSON.push({
                                                    key: filteredJSON.length,
                                                    value: std.value,
                                                });
                                            }
                                            this.props.update("contact_types", filteredJSON);
                                            break;
                                        }
                                        case "LICENSED PROFESSIONAL TYPE": {
                                            let filteredJSON = []
                                            for (let s in rawJSON[i].standardChoiceValueModels.standardChoiceValue) {
                                                let std = rawJSON[i].standardChoiceValueModels.standardChoiceValue[s];
                                                filteredJSON.push({
                                                    key: filteredJSON.length,
                                                    value: std.value,
                                                });
                                            }
                                            this.props.update("lp_types", filteredJSON);
                                            break;
                                        }
                                        default: break;
                                    }
                                }
                                break;
                            }

                            case "WorkflowModel.xml": {
                                console.log("LOADING File: " + file_names[f]);
                                let rawJSON = fxp.parse(file_text).list.workflow;
                                let filteredJSON = [];
                                for (let i in rawJSON) {
                                    if (!rawJSON[i].workflowMetadata) continue;
                                    let meta_text = rawJSON[i].workflowMetadata.metaDataDefinition.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&amp;/g, "&").replace(/&quot;/g, "\"");
                                    // let chunks = meta_text.match(/<Flow[\s\S]customObject="([\s\S]+?}]")/g);
                                    // chunks = chunks.map(s => /<Flow[\s\S]customObject="([\s\S]+?}]")/.exec(s)[1])
                                    // console.log(chunks);
                                    let status = meta_text.match(/"statusDescription":"([-.\w\s]+?)"/g);
                                    status = status.map(s => /"statusDescription":"([-.\w\s]+?)"/.exec(s)[1]);
                                    let tasks = meta_text.match(/"taskName":"([-.\w\s]+?)"/g);
                                    tasks = tasks.map(t => /"taskName":"([-.\w\s]+?)"/.exec(t)[1]);
                                    filteredJSON.push({
                                        tasks: tasks,
                                        status: status,
                                    });
                                }
                                this.props.update("workflows", filteredJSON);
                                break;
                            }

                            default: {
                                console.log("Ignoring File: " + file_names[f]);
                                break;
                            }
                        }
                    });
                }
            })
        } else {
            console.log("INVALID FILE UPLOAD!");
        }
    }

    render() {
        return (
        <div>
             <input type="file" name="file" onChange={this.handleChange}/>
        </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    update: (type, data) => dispatch({
        type: "load_file_data",
        payload: {
            type: type,
            data: data
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Upload);
