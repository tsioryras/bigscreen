import React, {useEffect, useState} from 'react';
import Question from './Question';
import axios from "axios";
import logo from "../../../images/bigscreen_logo_white.png";
import MessageAlert from "./MessageAlert";

const SurveyFrom = () => {

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState();
    const [errorDisplay, setErrorDisplay] = useState('d-none');
    const [errorType, setErrorType] = useState('');
    const [errorText, setErrorText] = useState('');
    const [errorLink, setErrorLink] = useState('');
    const [errorTitle, setErrorTitle] = useState('');

    useEffect(() => {
        axios.get('/questions').then(function (response) {
            setData(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const handleField = (event) => {
        const newData = {...formData};
        newData[event.target.name] = event.target.value;
        setFormData(newData);
    };

    const onSendData = (event) => {
        console.log(formData);
        event.preventDefault();
        axios.post('/submit', {
            field1: "r@r.fg",
            field10: "Regarder des films",
            field11: "2",
            field12: "2",
            field13: "4",
            field14: "2",
            field15: "3",
            field16: "non",
            field17: "non",
            field18: "non",
            field19: "non",
            field2: "tz",
            field20: "zt",
            field3: "Préfère ne pas répondre",
            field4: "4",
            field5: "ztz",
            field6: "Windows Mixed Reality",
            field7: "Viveport",
            field8: "Occulus Quests",
            field9: "1"
        })
            .then(function (response) {
                const status = response.data.status;
                const message = response.data.message;

                if (status === 400) {
                    setErrorType('warning');
                    setErrorText(message);
                    setErrorTitle('Attention!');
                }

                if (status === 200) {
                    setErrorType('success');
                    setErrorText(message);
                    setErrorTitle('Merci à bientôt!');
                    setErrorLink(response.data.link);
                }
            })
            .catch(function (error) {
                console.log(error);
                setErrorType('danger');
                setErrorTitle('Ooops!');
                setErrorText('Un erreur serveur est survenue! Veuillez reéessayer');
            });
        setErrorDisplay('');
    };

    const onCloseAlert = () => {
        setErrorDisplay('d-none');
        setErrorText('');
        setErrorTitle('');
        setErrorLink('');
    };

    const listQuestions = data.map((question, key) => {
            const title = 'Question ' + (key + 1) + '/20';
            return <Question key={key} number={key + 1}
                             content={question}
                             type={question.type}
                             title={title}
                             onRespond={handleField}/>
        }
    );

    return (
        <div className="container py-3">
            <div className="row justify-content-center">
                <MessageAlert type={errorType}
                              text={errorText}
                              link={errorLink}
                              title={errorTitle}
                              display={errorDisplay}
                              close={onCloseAlert}
                />
                <div className="col-md-8">
                    <div className="card" id="form-survey">
                        <div className="card-header">
                            <div className="col-md-12 logo">
                                <img src={logo} alt="BIG SCREEN"/>
                                <p>Merci de répondre à toutes les questions et de valider le formulaire en bas de
                                    page</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body wizard-content">
                                <form className="m-t-40" onSubmit={onSendData}>
                                    {listQuestions}
                                    <div className="row">
                                        <div className="offset-10">
                                            <button className="btn btn-success"
                                                    id="submit"
                                                    name="submit"
                                                    type="submit">
                                                Finaliser
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SurveyFrom;

