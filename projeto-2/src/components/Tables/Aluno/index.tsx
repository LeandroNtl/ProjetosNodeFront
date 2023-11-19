import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import api from '../../../services/api';
import { useEffect, useState } from 'react';
import AlunoForm from '../../Forms/Aluno';

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

const AlunoTable = () => {

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [selectedAluno, setSelectedAluno] = useState(0);

    useEffect(() => {
        api.get("/alunos").then((response) => setAlunos(response.data));
        api.get("/cursos").then((response) => setCursos(response.data));
    }, []);

    const handleDelete = async (id: number) => {
        await api.delete(`/alunos/${id}`);
        window.location.reload();
        api.get("/alunos").then((response) => setAlunos(response.data));

    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Curso</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno: any) => (
                                <tr key={aluno.id}>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.email}</td>
                                    <td>{cursos.find((curso: any) => curso.id === aluno.cur_id)?.curso}</td>

                                    <td>
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setSelectedAluno(aluno.id)}>
                                            Editar
                                        </button>
                                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#ModalConfirm" onClick={() => setSelectedAluno(aluno.id)}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cadastro de aluno</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <AlunoForm aluno={alunos.find((aluno: any) => aluno.id === selectedAluno)} cursos={cursos} />
                        </div>

                    </div>
                </div>
            </div>

            <div className="modal fade" id="ModalConfirm" tabIndex={-1} aria-labelledby="ModalConfirmLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalConfirmLabel">Exclusão de aluno</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            Deseja realmente excluir este aluno?
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedAluno)}>Excluir</button>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Cadastrar novo aluno
                    </button>
                </div>
            </div>
        </div>
    );

};

export default AlunoTable;