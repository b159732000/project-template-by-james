import React from 'react';
import './Qwzs.scss';

class Qwzs extends React.Component {
    render() {
        return (
            <div className="QwzsContainer">

                {/* 背景鏤空字 */}
                <div className="bgStrokeText">LOCATION</div>

                {/* 四大灣區...等等共五個清單 */}
                <div className="choiceList">
                    <ul>
                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/DA_08-995x560.jpg')} alt="" />
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/MS_06-copy-995x560.jpg')} alt="" />
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/AGT_S13_05-995x560.jpg')} alt="" />
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/HEY_DJ_06-995x560.jpg')} alt="" />
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="imgDiv">
                                <img src={require('../../images/SW_06-995x560.jpg')} alt="" />
                            </div>
                            <div className="content">
                                <div className="title">四大灣區</div>
                                <div className="instruction">
                                    <div>Lorem Ipsum dummy</div>
                                    <div>Text of the printing industry.</div>
                                    <div>2019</div>
                                </div>
                                <div className="bottom">
                                    <div className="currentPage">01</div>
                                    <div className="slash">/</div>
                                    <div className="totalPages">15</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

export { Qwzs };