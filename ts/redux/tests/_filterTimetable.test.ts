import {
    expect
} from "chai";
import {
    StateKind,
    STCBox
} from "./../../model/states/stcBox";
import {
    GetTestTimetables1
} from "./../../tests/testDataGenerator";
import {
    FilterTimetable
} from "./../actions/filterTimetable";
import {
    GoToNextTimetable
} from "./../actions/goToNextTimetable";
import {
    ITimetableListState,
    TimetableListState,
    TimetableListStateReducer
} from "./../reducers/timetableListState";

const state = new STCBox(StateKind.MaybeOccupied, 0, parseInt("1000000", 2), 5);

describe("FilterTimetable action", () => {
    it("'s typename should be 'filter timetable at [YX]'", () => {
        const action = new FilterTimetable(state);
        expect(action.TypeName()).to.eq(`filter timetable at [${state.Uid}]`);
    });

    it("should set property of FiltrateTimetables and ResidueTimetables ", () => {
        const initialState = new TimetableListState(GetTestTimetables1());
        const newState = TimetableListStateReducer(initialState, new FilterTimetable(state).Action());
        expect(newState.FiltrateTimetables).to.not.deep.eq(initialState.FiltrateTimetables);
        expect(newState.ResidueTimetables).to.not.deep.eq(initialState.ResidueTimetables);
    });

    it("the resulting FiltrateTimetables and ResidueTimetables should equal to the original list of timetables when they concated", () => {
        const initialState = new TimetableListState(GetTestTimetables1());
        const newState = TimetableListStateReducer(initialState, new FilterTimetable(state).Action());
        expect(newState.FiltrateTimetables.concat(newState.ResidueTimetables).length).to.eq(initialState.FiltrateTimetables.length);
    });

    it("should set property of TotalState based on the filtered timetables", () => {
        const action = new FilterTimetable(state).Action();
        const initialState = new TimetableListState(GetTestTimetables1());
        expect(initialState.TotalState).to.eq(null);
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.TotalState).to.not.eq(null);
    });

    it("should set property of UidsOfClickedState", () => {
        const action = new FilterTimetable(state).Action();
        const initialState = new TimetableListState(GetTestTimetables1());
        expect(initialState.UidsOfClickedState.length).to.eq(0);
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.UidsOfClickedState.length).to.eq(1);
        expect(newState.UidsOfClickedState[0]).to.eq("05");
    });

    it("should set property of ClickedTimeConstraint", () => {
        const action = new FilterTimetable(state).Action();
        const initialState = new TimetableListState(GetTestTimetables1());
        expect(initialState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.ClickedTimeConstraint).to.deep.eq([parseInt("1000000", 2), 0, 0, 0, 0, 0, 0]);
    });

    it("should set property of CurrentIndex to 0", () => {
        const action = new FilterTimetable(state).Action();
        const initialState = new TimetableListState(GetTestTimetables1());
        let newState = TimetableListStateReducer(initialState, new GoToNextTimetable().Action());
        expect(newState.CurrentIndex).to.eq(1);
        newState = TimetableListStateReducer(newState, action);
        expect(newState.CurrentIndex).to.eq(0);
    });
});
