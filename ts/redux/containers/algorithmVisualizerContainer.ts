import {connect} from "react-redux";
import { AlgorithmVisualizerView, IAlgorithmVisualizerViewDispatchProps, IAlgorithmVisualizerViewStateProps } from "../../react/algorithmVisualizerView";
import { ToggleIsOpenOfAlgorithmVisualizerView } from "../actions/toggleIsOpenOfAlgorithmVisualizerView";
import { IMasterState } from "../reducers/masterState";

const mapStateToProps = (state): IAlgorithmVisualizerViewStateProps => {
    const masterState = state.MasterStateReducer as IMasterState;
    return {
        open: masterState.AlgorithmVisualizerState.isOpen,
        expectedHitCount: masterState.TimetableListState.FiltrateTimetables.length,
        actualHitCount: masterState.AlgorithmVisualizerState.searchedPathCount
    };
};

const mapDispatchToProps = (dispatch): IAlgorithmVisualizerViewDispatchProps => {
    return {
        handleClose: () => dispatch(new ToggleIsOpenOfAlgorithmVisualizerView(false))
    };
};

export const AlgorithmVisualizerViewContainer = connect(mapStateToProps, mapDispatchToProps)(AlgorithmVisualizerView);