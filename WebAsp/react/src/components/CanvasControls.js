import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

function CanvasControls(props) {
    let context = useContext(AppContext);
    return (
        <div className="controls" id="controls">
            <div className="control cost">
                Стоимость плоттинга: <span id="cost">{context.dxf.cost}</span> у.е.
                </div>
            <label htmlFor="file" className="control btn" onClick={context.triggerNewFile}>
                <FontAwesomeIcon icon={faFolderOpen} />
            </label>
            <button className="control btn" onClick={() => props.zoom(-1)}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className="control btn" onClick={() => props.zoom(+1)}>
                <FontAwesomeIcon icon={faMinus}/>
            </button>
        </div>
    );
}

export default CanvasControls;