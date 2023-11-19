import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FormEvent, useEffect, useState } from 'react';
import api from '../../../services/api';

interface Curso {
    id: number;
    curso: string;
    createdAt: string;
    updatedAt: string;
}

interface CursoFormProps {
    curso?: Curso;
}

const CursoForm = ({ curso }: CursoFormProps) => {

    const [cursoNome, setCursoNome] = useState("");

    useEffect(() => {
        if (curso) {
            setCursoNome(curso.curso);
        }
    }, [curso]);


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            curso: cursoNome
        };
        if (curso) {
            await api.put(`/cursos/${curso.id}`, data);
            if (window.confirm("Registro alterado com sucesso!")) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        } else {
            await api.post("/cursos", data);
            if (window.confirm("Registro inserido com sucesso!")) {
                window.location.reload();
            } else {
                window.location.reload();
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="curso">Curso</label>
                            <input
                                type="text"
                                className="form-control"
                                id="curso"
                                placeholder="Nome do curso"
                                value={cursoNome}
                                onChange={(e) => setCursoNome(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {curso ? "Alterar" : "Cadastrar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default CursoForm;