import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FormEvent, useEffect, useState } from 'react';
import api from '../../../services/api';

interface Aluno {
    id: number;
    nome: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    cur_id: number;
}

interface Curso {
    id: number;
    curso: string;
    createdAt: string;
    updatedAt: string;
}

interface AlunoFormProps {
    aluno?: Aluno;
    cursos: Curso[];
}

const AlunoForm = ({ aluno, cursos }: AlunoFormProps) => {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cur_id, setCur_id] = useState(0);

    useEffect(() => {
        if (aluno) {
            setNome(aluno.nome);
            setEmail(aluno.email);
            setCur_id(aluno.cur_id);
        }
    }, [aluno]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            nome,
            email,
            cur_id
        };
        if (aluno) {
            await api.put(`/alunos/${aluno.id}`, data);
            if (window.confirm("Registro alterado com sucesso!")) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        } else {
            await api.post("/alunos", data);
            if (window.confirm("Registro inserido com sucesso!")) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        }
        setNome("");
        setEmail("");
        setCur_id(0);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="curso" className="form-label">Curso</label>
                            <select className="form-select" id="curso" name="curso" value={cur_id} onChange={(e) => setCur_id(Number(e.target.value))}>
                                <option value={0}>Selecione um curso</option>
                                {cursos.map((curso) => (
                                    <option key={curso.id} value={curso.id}>{curso.curso}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default AlunoForm;