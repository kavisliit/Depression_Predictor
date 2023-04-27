import React, { useState } from "react";
import axios from "axios";
import './predict.css'
import sad from './sad.png'
import good from './good.png'
function PredictionForm() {
    const [gender, setGender] = useState(0);
    const [age, setAge] = useState(0);
    const [educationLevel, setEducationLevel] = useState(0);
    const [maritalStatus, setMaritalStatus] = useState(0);
    const [householdSize, setHouseholdSize] = useState(0);
    const [householdIncome, setHouseholdIncome] = useState(0);
    const [timeInJob, setTimeInJob] = useState(0);
    const [troubleSleeping, setTroubleSleeping] = useState(0);
    const [sleepHours, setSleepHours] = useState(0);
    const [recreation, setRecreation] = useState(0);
    const [sedentaryTime, setSedentaryTime] = useState(0);
    const [vigorousWork, setVigorousWork] = useState(0);
    const [moderateWork, setModerateWork] = useState(0);
    const [canWork, setCanWork] = useState(0);
    const [heart, setHeart] = useState(0);
    const [diabetes, setDiabetes] = useState(0);
    const [algorithm, setalgorithm] = useState("");
    const [res, setres] = useState(false);
    const [acc, setacc] = useState(false);
    const [accuracys, setaccuracys] = useState(0);
    const [predic, setpredic] = useState(0);

    const reset = () => {
        setres(false)
        setacc(false)

    }
    const accuracy = async () => {
        if (algorithm === "") {
            alert("please select algorithm !!!")
            return
        }
        const res = await axios.post('http://127.0.0.1:5000/accuracy', { algorithm })
        setaccuracys(res.data.accuracy)
        setres(false)
        setacc(true)

    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // code to send the data to the prediction algorithm and display the results
    };
    const predict = async () => {
        let grade9 = 0;
        let Above = 0;
        let Degree = 0;
        let High = 0;
        let Less = 0;

        if (educationLevel === 0) {
            Degree = 1;
        } else if (educationLevel === 1) {
            Above = 1;
        } else if (educationLevel === 2) {
            High = 1;
        } else if (educationLevel === 3) {
            grade9 = 1;
        } else if (educationLevel === 4) {
            Less = 1;
        }


        let Divorced = 0;
        let Married = 0;
        let Never = 0;
        let Partner = 0;
        let Separated = 0;
        let Widowed = 0;


        if (maritalStatus === 0) {
            Married = 1;
        } else if (maritalStatus === 1) {
            Never = 1;
        } else if (maritalStatus === 2) {
            Divorced = 1;
        } else if (maritalStatus === 3) {
            Partner = 1;
        } else if (maritalStatus === 4) {
            Widowed = 1;
        } else if (maritalStatus === 5) {
            Separated = 1;
        }

        let Abovem = 0;
        let Belowm = 0;
        if (householdIncome === 0) {
            Belowm = 1;
        } else if (householdIncome === 1) {
            Abovem = 1;
        }
        if (algorithm === "") {
            alert("please select algorithm !!!")
            return
        }

        const ob = {
            features: [[gender, Number(age), Number(householdSize), Number(timeInJob), Number(sleepHours), Number(sedentaryTime), vigorousWork, moderateWork, troubleSleeping, recreation, canWork, heart, diabetes, grade9, Above, Degree, High, Less, Divorced, Married, Never, Partner, Separated, Widowed, Abovem, Belowm]],
            algorithm: algorithm
        }
        console.log(ob)
        const res = await axios.post('http://127.0.0.1:5000/predict', ob)
        setacc(false)
        setres(true)
        setpredic(res.data.predictions)
    }
    return (
        <div className="container con" >
            <div className="columns">
                <div className="column">
                    <h1 className="title mb-3 mt-4 is-1">Depression Predictor</h1>
                </div>
            </div>
            <form onSubmit={handleFormSubmit} className="forms">
                <div className="columns mb-3">
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Gender</label>
                            <div class="select">
                                <select onChange={(e) => {
                                    if (e.target.value === "0") {
                                        console.log(1)
                                        setGender(1)
                                    }
                                    else if (e.target.value === "1") {
                                        setGender(0)
                                    }
                                }}>
                                    <option value={-1}>Select Gender</option>
                                    <option value={0}>Male</option>
                                    <option value={1}>Female</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div>
                            <label htmlFor="sex">Age</label>
                            <input className="input is-primary"
                                type="number"
                                id="sex"
                                onChange={(event) => setAge(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Education Status</label>
                            <div class="select">
                                <select onChange={(e) => setEducationLevel(e.target.value)}>
                                    <option value={-1}>Select Education</option>
                                    <option value={0}>College or Degree</option>
                                    <option value={1}>College Graduate or Above </option>
                                    <option value={2}>High School</option>
                                    <option value={3}>9-11th Grade</option>
                                    <option value={4}>Less Than 9th Grade</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Marital Status</label>
                            <div class="select">
                                <select onChange={(e) => setMaritalStatus(e.target.value)}>
                                    <option value={-1}>Select Marital Status</option>
                                    <option value={0}>Married</option>
                                    <option value={1}>Never Married </option>
                                    <option value={2}>Divorced</option>
                                    <option value={3}>Partner</option>
                                    <option value={4}>Widowed</option>
                                    <option value={5}>Separated</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns mb-3">
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Family Member Count</label>
                            <input className="input is-primary"
                                type="number"
                                id="sex"

                                onChange={(event) => setHouseholdSize(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="column">
                        <div>
                            <label htmlFor="sex">Income</label>
                            <div class="select">
                                <select onChange={(e) => setHouseholdIncome(e.target.value)}>
                                    <option value={-1}>Select Income</option>
                                    <option value={0}>Below 40k</option>
                                    <option value={1}>Above 40k</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Time in Job</label>
                            <input className="input is-primary"
                                type="number"
                                id="sex"

                                onChange={(event) => setTimeInJob(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Sleeping Trouble</label>
                            <div class="select">
                                <select onChange={(e) => {
                                    if (e.target.value === "0") {
                                        setTroubleSleeping(1)
                                    } else if (e.target.value === "1") {
                                        setTroubleSleeping(0)
                                    }
                                }}>
                                    <option value={-1}>Select option</option>
                                    <option value={0}>Yes</option>
                                    <option value={1}>No</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns mb-3">
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Sleeping Hours</label>
                            <input className="input is-primary"
                                type="number"
                                id="sex"

                                onChange={(event) => setSleepHours(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="column">
                        <div>
                            <label htmlFor="sex"> Recreation</label>
                            <div class="select">
                                <select onChange={(e) => {
                                    if (e.target.value === "0") {
                                        setRecreation(1)
                                    } else if (e.target.value === "1") {
                                        setRecreation(0)
                                    }
                                }}>
                                    <option value={-1}>Select option</option>
                                    <option value={0}>Yes</option>
                                    <option value={1}>No</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Sedentary Time</label>
                            <input className="input is-primary"
                                type="number"
                                id="sex"

                                onChange={(event) => setSedentaryTime(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Vigorous Work</label>
                            <div class="select">
                                <select onChange={(e) => {
                                    if (e.target.value === "0") {
                                        setVigorousWork(1)
                                    } else if (e.target.value === "1") {
                                        setVigorousWork(0)
                                    }
                                }}>
                                    <option value={-1}>Select option</option>
                                    <option value={0}>Yes</option>
                                    <option value={1}>No</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="columns mb-3">
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Moderate Work</label>
                            <div class="select">
                                <select onChange={(e) => {
                                    if (e.target.value === "0") {
                                        setModerateWork(1)
                                    } else if (e.target.value === "1") {
                                        setModerateWork(0)
                                    }
                                }}>
                                    <option value={-1}>Select option</option>
                                    <option value={0}>Yes</option>
                                    <option value={1}>No</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div>
                            <label htmlFor="sex">Can work</label>
                            <div class="select">
                                <select onChange={(e) => {
                                    if (e.target.value === "0") {
                                        setCanWork(1)
                                    } else if (e.target.value === "1") {
                                        setCanWork(0)
                                    }
                                }}>
                                    <option value={-1}>Select option</option>
                                    <option value={0}>Yes</option>
                                    <option value={1}>No</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Heart Disease</label>
                            <div class="select">
                                <select onChange={(e) => {
                                    if (e.target.value === "0") {
                                        setHeart(1)
                                    } else if (e.target.value === "1") {
                                        setHeart(0)
                                    }
                                }}>
                                    <option value={-1}>Select option</option>
                                    <option value={0}>Yes</option>
                                    <option value={1}>No</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div>
                            <label htmlFor="sex">Diabetes</label>
                            <div class="select">
                                <select onChange={(e) => {
                                    if (e.target.value === "0") {
                                        setDiabetes(1)
                                    } else if (e.target.value === "1") {
                                        setDiabetes(0)
                                    }
                                }}>
                                    <option value={-1}>Select option</option>
                                    <option value={0}>Yes</option>
                                    <option value={1}>No</option>

                                </select>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="columns mt-5">
                    <div className="column is-8">
                        <div class="control">
                            <label class="radio mx-5">
                                <input type="radio" name="answer" onChange={(e) => setalgorithm("lr")} className="mx-3" />
                                Logistic Regression
                            </label>
                            <label class="radio mx-5">
                                <input type="radio" name="answer" onChange={(e) => setalgorithm("dt")} className="mx-3" />
                                Desicion Tree
                            </label>
                            <label class="radio mx-5">
                                <input type="radio" name="answer" onChange={(e) => setalgorithm("rf")} className="mx-3" />
                                Random Forest
                            </label>
                            <label class="radio mx-5">
                                <input type="radio" name="answer" onChange={(e) => setalgorithm("sv")} className="mx-3" />
                                Support Vector
                            </label>
                        </div>
                    </div>
                    <div className="column is-4">
                        <button class="button is-success mx-3" onClick={() => predict()}>Predict</button>
                        <button class="button is-link mx-3" onClick={() => accuracy()}>Accuracy</button>
                        <button class="button is-primary" onClick={() => reset()}>Reset</button>
                    </div>
                </div>

            </form>
            {res ? <>
                <div className="columns is-justify-content-center  mt-3">
                    <div className="column is-2">
                        <img src={predic === 1 ? sad : good} alt="sad" className="imgs" />
                    </div>
                    <div className="column is-4 mt-3">
                        <h3 className={predic === 1 ? "sad title is-2" : "good title is-2"}>{predic === 1 ? "Depressed" : "Not Depressed"}</h3>
                    </div>
                </div>
            </> : <></>}

            {acc ? <>
                <div className="columns is-justify-content-center  mt-3">
                    <div className="column is-6 mt-3">
                        <h3 className="title is-2 good">Accuracy = {accuracys}</h3>
                    </div>
                </div>
            </> : <></>}
        </div>
    )
}

export default PredictionForm;