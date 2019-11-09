import React from "react";
import "../style/Config.css";

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
    active?: boolean;
}

const ClickConfigLink: React.FC<IClickConfigProps> = (props: IClickConfigProps) => {
    let className = "btn";
    if (props.active) {
        className += " active";
    }

    return (
        <p className={className}>{props.title}</p>
    );
}

const Config: React.FC = () => {
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
                    <ClickConfigLink title="push" active />
                    <ClickConfigLink title="flag" />
                </div>
            </div>
        </div>
    );
}

export default Config;