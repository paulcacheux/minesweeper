import React from "react";
import "../style/Config.css";
import { useDispatch, useSelector } from "react-redux";
import { changeTool } from "../store/actions";
import { AppState } from "../store/reducers";

interface IBoardConfigProps {
    title: string;
    width: number;
    height: number;
    bombs: number;
}

const BoardConfigLink: React.FC<IBoardConfigProps> = (props: IBoardConfigProps) => {
    return (
        <a className="btn" href={`?width=${props.width}&height=${props.height}&bombs=${props.bombs}`}>{props.title}</a>
    );
}

interface IClickConfigProps {
    title: string;
    active: boolean;
    targetConfig: boolean;
}

const ToolConfigButton: React.FC<IClickConfigProps> = (props: IClickConfigProps) => {
    const dispatch = useDispatch();

    let className = "btn";
    if (props.active) {
        className += " active";
    }

    const handler = () => {
        dispatch(changeTool(props.targetConfig));
    }

    return (
        <p className={className} onClick={handler}>{props.title}</p>
    );
}

const Config: React.FC = () => {
    const leftClickFlagCurrent = useSelector((state: AppState) => state.tools.leftClickFlag);

    return (
        <div id="config-box">
            <div>
                <p className="config-label">Difficulty</p>
                <div className="btn-group">
                    <BoardConfigLink title="easy" width={9} height={9} bombs={10} />
                    <BoardConfigLink title="medium" width={16} height={16} bombs={40} />
                    <BoardConfigLink title="hard" width={30} height={16} bombs={99} />
                </div>
            </div>
            <div>
                <p className="config-label">Touch mode</p>
                <div className="btn-group">
                    <ToolConfigButton title="push" targetConfig={false} active={!leftClickFlagCurrent} />
                    <ToolConfigButton title="flag" targetConfig={true} active={leftClickFlagCurrent} />
                </div>
            </div>
        </div>
    );
}

export default Config;