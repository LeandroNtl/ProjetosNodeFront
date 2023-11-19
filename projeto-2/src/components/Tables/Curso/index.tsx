import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import api from '../../../services/api';
import { useEffect, useState } from 'react';
import CursoForm from '../../Forms/Curso';


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

const CursoTable = () => {

    const [cursos, setCursos] = useState<Curso[]>([]);
    const [selectedCurso, setSelectedCurso] = useState(0);
    const [alunos, setAlunos] = useState<Aluno[]>([]);

    useEffect(() => {
        api.get("/cursos").then((response) => setCursos(response.data));
    }, []);

    const handleDelete = async (id: number) => {
        await api.delete(`/cursos/${id}`);
        window.location.reload();
        api.get("/cursos").then((response) => setCursos(response.data));

    };

    const getAlunos = async (id: number) => {
        await api.get(`/alunosCurso/${id}`).then((response) => setAlunos(response.data));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cursos.map((curso: any) => (
                                <tr key={curso.id}>
                                    <td>{curso.curso}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => setSelectedCurso(curso.id)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(curso.id)}
                                        >
                                            Excluir
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            data-bs-toggle="modal"
                                            data-bs-target="#ModalAlunos"
                                            onClick={() => getAlunos(curso.id)}
                                        >
                                            Alunos
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <CursoForm curso={cursos.find((curso) => curso.id === selectedCurso)} />
                </div>

                <div className="modal fade" id="ModalAlunos" tabIndex={-1} aria-labelledby="ModalAlunosLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalAlunosLabel">Alunos do curso</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setAlunos([])}></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Curso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alunos.map((aluno: any) => (
                                            <tr key={aluno.id}>
                                                <td>{aluno.nome}</td>
                                                <td>{aluno.email}</td>
                                                <td>{cursos.find((curso: any) => curso.id === aluno.cur_id)?.curso}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setAlunos([])}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CursoTable;