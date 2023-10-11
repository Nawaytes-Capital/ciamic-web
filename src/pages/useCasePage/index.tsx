import { Button } from "antd";
import { useMemo, useState } from "react";
import HeaderUsecase from "./component/header";
import "./styles.scss";
import { Input } from 'antd';

const { TextArea } = Input;

const useCasePage = () => {
    const [question, setQuestion] = useState(1);
    const [answer, setAnswer] = useState<string>("");
    const [useCase, setUseCase] = useState<string[]>([]);

    const handleChange = (e: any) => {
        setAnswer(e.target.value)
    }

    const handleSubmit = () => {
        setUseCase([...useCase, answer]);
        setAnswer('');
        if(question < 10){
            setQuestion((prev) => prev + 1)
        } else {
            setQuestion(0)
        }
    }
    
    const setOfQuestion = useMemo(() => {
		if(question === 1){
            return 'Kita mulai aja yuk, nama perusahaannya/brand-nya client kamu itu apa sih?'
        } else if(question === 2) {
            return 'nama perusahaannya/brand-nya client kamu itu apa sih? 2'
        } else if(question === 3) {
            return 'Test pertanyaan 3'
        } else if(question === 4) {
            return 'Test pertanyaan 4'
        } else if(question === 5) {
            return 'Test pertanyaan 5'
        } else if(question === 6) {
            return 'Test pertanyaan 6'
        } else if(question === 7) {
            return 'Test pertanyaan 7'
        } else if(question === 8) {
            return 'Test pertanyaan 8'
        } else if(question === 9) {
            return 'Test pertanyaan 9'
        } else if(question === 10) {
            return 'Test pertanyaan 10'
        } else {
            return 'Selesai'
        }
	}, [question]);
    
    return (
        <>
            <HeaderUsecase />
            <div className="question-wp">
                <div className="title-wp">
                    <div className="number">{question}</div>
                    <div className="question">{setOfQuestion}</div>
                </div>
                <div className="steps">
                    <div className="steps-complete" style={{width: `${question}0%`}}/>
                </div>
                <TextArea className="textarea" value={answer} onChange={(e) => handleChange(e)} />
                <Button type="primary" className="btn-submit" onClick={handleSubmit}>
                    Lanjut
                </Button>
            </div>
        </>
    )
}

export default useCasePage;