import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../layer_common.css";
import { MdClose } from "react-icons/md";

const LAYER_ROOT = document.getElementById("layer-root");

class Layer extends Component {
    render() {
        const { children, onClose, layerTitle } = this.props;
        return ReactDOM.createPortal(
            <div className='layer-dimmed' style={{ overflow: "hidden" }}>
                <div className='layer-wrap'>
                    <div className='layer-inner'>
                        <div className='layer-title'>
                            <h2>{layerTitle}</h2>
                        </div>
                        <div className='layer-content'>{children}</div>
                        <button
                            className='layer-btn-close'
                            type='button'
                            title='닫기 버튼'
                            aria-label='닫기 버튼'
                            onClick={onClose}
                        >
                            <MdClose />
                        </button>
                    </div>
                </div>
            </div>,
            LAYER_ROOT
        );
    }
}

export default Layer;
