import { Beautify } from "../helper";
import {RawSlot} from "./rawSlot";

export class Subject {
    public static GetSubjectNameOf(subjectCode: string) : string {
        return Beautify(Subject.subjectCodeAndName[subjectCode]);
    }
    private static subjectCodeAndName = {};
    public readonly Name: string;
    public readonly Code: string;
    public readonly SlotUids: number[]; // SlotIds are generated by TTAP, they are unique for each slot
    public readonly SlotNumbers: string[]; // SlotNumber is what shown in the HTML, they are not necessarily unique
    public IsSelected: boolean;
    public IsVisible : boolean;
    public ClashingCounterparts: string[]; // subject codes of clashing counterparts
    public ClashReport: ClashReport;
    constructor(name: string, code: string, slotIds: number[], slotNumbers: string[]) {
        this.Name = name;
        this.Code = code;
        this.SlotUids = slotIds;
        this.SlotNumbers = slotNumbers;
        this.IsSelected = false;
        this.IsVisible = true;
        this.ClashingCounterparts = [];
        this.ClashReport = null;
        Subject.subjectCodeAndName[code] = name;
    }
}

export type ClashingType = "single" | "group";
export class ClashReport {
    public readonly TargetName: string;
    public readonly Type: ClashingType;
    public constructor(type: ClashingType, targetName: string = null) {
        this.Type = type;
        this.TargetName = targetName;
    }
}
