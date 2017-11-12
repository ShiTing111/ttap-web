import Button from "material-ui-next/Button";
import Dialog from "material-ui-next/Dialog";
import Slide from "material-ui-next/transitions/Slide";
import Typography from "material-ui-next/Typography";
import * as React from "react";
import {ColorOfDefinitelyOccupied, ColorOfDefinitelyUnoccupied, ColorOfMaybeOccupied, State} from "../model/states/state";
import {Colors} from "./colors/colors";
import {TimetableView} from "./timetableView";

// region style
const typoStyle : React.CSSProperties = {
    marginTop: "15px"
};

const divStyle : React.CSSProperties = {
    textAlign: "center"
};

const cancelButtonStyle : React.CSSProperties = {
    marginRight: "10px"
};

const legendFrameStyle : React.CSSProperties = {
    height: "100px",
    margin: "0 auto",
    width: "50%",
    border: "solid 1px lightgrey",
    padding: "10px"
};
// endregion style

function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

type LegendType = "red" | "grey" | "green";
interface ILegendProps {
    type : LegendType;
    label : string;
}

const Legend = (props : ILegendProps) => {
    const background = () => {
        switch (props.type) {
            case "red":
                return ColorOfDefinitelyOccupied;
            case "grey":
                return ColorOfDefinitelyUnoccupied;
            case "green":
                return ColorOfMaybeOccupied;
        }
    };

    const legendSymbol : React.CSSProperties = {
        marginRight: "10px",
        width: "30px",
        height: "20px",
        float: "left",
        background: background()
    };

    const legendLabel : React.CSSProperties = {
        float: "left"
    };

    return (
        <tr>
            <td style={legendSymbol}/>
            <td style={legendLabel}>
                <Typography type="subheading">
                    {props.label}
                </Typography>
            </td>
        </tr>
    );
};

export interface ISetTimeConstraintViewStateProps {
    totalState : State[];
    isOpen : boolean;
    numberOfRemovedTimetables : number;
    numberOfRemainingTimetables : number;
}

export interface ISetTimeConstraintViewDispatchProps {
    handleSetTimeConstraintAt : (state : State) => void;
    handleDesetTimeConstraintAt : (state : State) => void;
    handleCancel : () => void;
}

interface ISetTimeConstraintViewProps extends ISetTimeConstraintViewStateProps,
ISetTimeConstraintViewDispatchProps {}
export class SetTimeConstraintView extends React.Component < ISetTimeConstraintViewProps, {} > {
    public render() {
        return (
            <div>
                <Dialog open={this.props.isOpen} fullScreen={true} transition={Transition}>
                    <div style={divStyle}>
                        <Typography
                            type="display2"
                            style={typoStyle}
                            gutterBottom={true}
                            align="center">
                            Set time constraint
                        </Typography>
                        <table style={legendFrameStyle}>
                            <tbody>
                                <Legend type="grey" label="Definitely no class"/>
                                <Legend type="red" label="Definitely have class"/>
                                <Legend type="green" label="Click me if you don't want to have class here"/>
                            </tbody>
                        </table>
                        <TimetableView
                            timetable={null}
                            states={this.props.totalState}
                            handleSetTimeContraintAt={this.props.handleSetTimeConstraintAt}
                            handleDesetTimeContraintAt={this.props.handleDesetTimeConstraintAt}/>
                        <Typography type="body2" style={typoStyle} gutterBottom={true} align="center">
                            {`Removed ${this.props.numberOfRemovedTimetables} unsatisfactory timetables. ${this.props.numberOfRemainingTimetables} timetables remaining.`}
                        </Typography>
                        <Button
                            style={cancelButtonStyle}
                            color="default"
                            onClick={this.props.handleCancel}>Cancel</Button>
                        <Button raised={true} color="primary" onClick={this.props.handleCancel}>Done</Button>
                    </div>
                </Dialog>
            </div>
        );
    }

    public componentDidMount() {}
}
