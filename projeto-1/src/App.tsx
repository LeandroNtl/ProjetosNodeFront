import { useState, useEffect } from "react";
import axios from "axios";
import { Footer, Header, Layout, Main } from "./components";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {

    const apiURL = 'http://localhost:8000';

    const [projetores, setProjetores] = useState([]);
    const [projetoresDisponiveis, setProjetoresDisponiveis] = useState([]);
    const [novoProjetor, setNovoProjetor] = useState({
        status: '',
        marca: '',
        agendamento: {
            dataAgendamento: '',
            horaAgendamento: '',
            usuario: ''
        }
    });
    const [editProjetor, setEditProjetor] = useState({
        id: '',
        status: '',
        marca: '',
        agendamento: {
            dataAgendamento: '',
            horaAgendamento: '',
            usuario: ''
        }
    });

    const read = async () => {
              
        try {
            const response = await axios.get(`${apiURL}/projetores`);
            setProjetores(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    const readDisponiveis = async () => {
                  
        try {
            const response = await axios.get(`${apiURL}/projetores`);
            const projetoresDisponiveis = response.data.filter((projetor: any) => projetor.status === 'Disponível');
            setProjetoresDisponiveis(projetoresDisponiveis);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        read();
        readDisponiveis();
    }, []);

    const create = async () => {

        try {
            const dataFormatada = novoProjetor.agendamento.dataAgendamento.split('-').reverse().join('/');
            const projetorFormatado = {
                status: novoProjetor.status,
                marca: novoProjetor.marca,
                agendamento: {
                    dataAgendamento: dataFormatada,
                    horaAgendamento: novoProjetor.agendamento.horaAgendamento,
                    usuario: novoProjetor.agendamento.usuario
                }
            };

            await axios.post(`${apiURL}/projetores`, projetorFormatado);

            setNovoProjetor({
                status: '',
                marca: '',
                agendamento: {
                    dataAgendamento: '',
                    horaAgendamento: '',
                    usuario: ''
                }
            });

        } catch (error) {
            console.log(error);
        }

    }

    const update = async () => {
            
        try {
            const dataFormatada = editProjetor.agendamento.dataAgendamento.split('-').reverse().join('/');
            const projetorFormatado = {
                status: editProjetor.status,
                marca: editProjetor.marca,
                agendamento: {
                    dataAgendamento: dataFormatada,
                    horaAgendamento: editProjetor.agendamento.horaAgendamento,
                    usuario: editProjetor.agendamento.usuario
                }
            };

            await axios.put(`${apiURL}/projetores/${editProjetor.id}`, projetorFormatado);

            setEditProjetor({
                id: '',
                status: '',
                marca: '',
                agendamento: {
                    dataAgendamento: '',
                    horaAgendamento: '',
                    usuario: ''
                }
            });

        } catch (error) {
            console.log(error);
        }

    }

    const remove = async (id: any) => {
            
        try {
            await axios.delete(`${apiURL}/projetores/${id}`);
            read();
        } catch (error) {
            console.log(error);
        }

    }

    const devolver = async (id: any) => {
                
        try {
            const projetor = projetores.find((projetor: any) => projetor.id === id) || {marca: ''};
            const projetorFormatado = {
                status: 'Disponível',
                marca: projetor.marca,
                agendamento: {
                    dataAgendamento: '',
                    horaAgendamento: '',
                    usuario: ''
                }
            };

            await axios.put(`${apiURL}/projetores/${id}`, projetorFormatado);

            setEditProjetor({
                id: '',
                status: '',
                marca: '',
                agendamento: {
                    dataAgendamento: '',
                    horaAgendamento: '',
                    usuario: ''
                }
            });

        } catch (error) {
            console.log(error);
        }

    }



    return (
        <Layout>
            <Header />
            <Main>

                <div className="container">
                        
                    <div className="row">

                        <div className="col-md-12">
                            <h1>Projetores</h1>
                        </div>

                        <div className="col-md-12" style={{ marginBottom: '20px' }}>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNovoProjetor" style={{marginRight: "20px"}}>
                                Adicionar
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalVerProjetoresDisponiveis">
                                Ver Projetores Disponíveis
                            </button>
                        </div>

                        <div className="col-md-12">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Marca</th>
                                        <th scope="col">Data Agendamento</th>
                                        <th scope="col">Hora Agendamento</th>
                                        <th scope="col">Usuário</th>
                                        <th scope="col">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        projetores.map((projetor: any) => (
                                            <tr key={projetor.id}>
                                                <td>{projetor.id}</td>
                                                <td>{projetor.status}</td>
                                                <td>{projetor.marca}</td>
                                                <td>{projetor.agendamento.dataAgendamento}</td>
                                                <td>{projetor.agendamento.horaAgendamento}</td>
                                                <td>{projetor.agendamento.usuario}</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditarProjetor" onClick={() => setEditProjetor(projetor)}>
                                                        {projetor.status === 'Disponível' ? 'Agendar' : 'Editar'}
                                                    </button>
                                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalExcluirProjetor" onClick={() => setEditProjetor(projetor)}>
                                                        Excluir
                                                    </button>
                                                    {projetor.status == 'Em uso' ? 
                                                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalDevolver" onClick={() => setEditProjetor(projetor)}>
                                                            Devolver
                                                        </button>
                                                    : ''}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                
                </div>

                {/* Modal Novo Projetor */}
                <div className="modal fade" id="modalNovoProjetor" tabIndex={-1} aria-labelledby="modalNovoProjetorLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={() => create()}>
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title" id="modalNovoProjetorLabel">Novo Projetor</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select className="form-select" id="status" onChange={(e) => setNovoProjetor({ ...novoProjetor, status: e.target.value })} required={true}>
                                        <option value="">Selecione</option>
                                        <option value="Disponível">Disponível</option>
                                        <option value="Em uso">Em uso</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="marca" className="form-label">Marca</label>
                                    <input type="text" className="form-control" id="marca" onChange={(e) => setNovoProjetor({ ...novoProjetor, marca: e.target.value })} required={true}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dataAgendamento" className="form-label">Data Agendamento</label>
                                    <input type="date" className="form-control" id="dataAgendamento" value={novoProjetor.agendamento.dataAgendamento} onChange={(e) => setNovoProjetor({ ...novoProjetor, agendamento: { ...novoProjetor.agendamento, dataAgendamento: e.target.value } })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="horaAgendamento" className="form-label">Hora Agendamento</label>
                                    <input type="time" className="form-control" id="horaAgendamento" value={novoProjetor.agendamento.horaAgendamento} onChange={(e) => setNovoProjetor({ ...novoProjetor, agendamento: { ...novoProjetor.agendamento, horaAgendamento: e.target.value } })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label">Usuário</label>
                                    <input type="text" className="form-control" id="usuario" value={novoProjetor.agendamento.usuario} onChange={(e) => setNovoProjetor({ ...novoProjetor, agendamento: { ...novoProjetor.agendamento, usuario: e.target.value } })} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Modal Editar Projetor */}
                <div className="modal fade" id="modalEditarProjetor" tabIndex={-1} aria-labelledby="modalEditarProjetorLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={() => update()}>
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title" id="modalEditarProjetorLabel">Editar Projetor</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input type="hidden" id="id" value={editProjetor.id} />
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select className="form-select" id="status" value={editProjetor.status} onChange={(e) => setEditProjetor({ ...editProjetor, status: e.target.value })} required={editProjetor.status === 'Em uso' ? true : false}>
                                        <option value="">Selecione</option>
                                        <option value="Disponível">Disponível</option>
                                        <option value="Em uso">Em uso</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="marca" className="form-label">Marca</label>
                                    <input type="text" className="form-control" id="marca" value={editProjetor.marca} onChange={(e) => setEditProjetor({ ...editProjetor, marca: e.target.value })} required={editProjetor.status === 'Em uso' ? true : false}/>
                                </div>
                                <div className="mb-3" style={{ display: editProjetor.status !== 'Em uso' ? 'none' : 'block' }}>
                                    <label htmlFor="dataAgendamento" className="form-label">Data Agendamento</label>
                                    <input type="date" className="form-control" id="dataAgendamento" value={editProjetor.agendamento.dataAgendamento} onChange={(e) => setEditProjetor({ ...editProjetor, agendamento: { ...editProjetor.agendamento, dataAgendamento: e.target.value } })} required={editProjetor.status === 'Em uso' ? true : false}/>
                                </div>
                                <div className="mb-3" style={{ display: editProjetor.status !== 'Em uso' ? 'none' : 'block' }}>
                                    <label htmlFor="horaAgendamento" className="form-label">Hora Agendamento</label>
                                    <input type="time" className="form-control" id="horaAgendamento" value={editProjetor.agendamento.horaAgendamento} onChange={(e) => setEditProjetor({ ...editProjetor, agendamento: { ...editProjetor.agendamento, horaAgendamento: e.target.value } })} required={editProjetor.status === 'Em uso' ? true : false}/>
                                </div>
                                <div className="mb-3" style={{ display: editProjetor.status !== 'Em uso' ? 'none' : 'block' }}>
                                    <label htmlFor="usuario" className="form-label">Usuário</label>
                                    <input type="text" className="form-control" id="usuario" value={editProjetor.agendamento.usuario} onChange={(e) => setEditProjetor({ ...editProjetor, agendamento: { ...editProjetor.agendamento, usuario: e.target.value } })} required={editProjetor.status === 'Em uso' ? true : false}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
                    
                {/* Modal Excluir Projetor */}

                <div className="modal fade" id="modalExcluirProjetor" tabIndex={-1} aria-labelledby="modalExcluirProjetorLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title" id="modalExcluirProjetorLabel">Excluir Projetor</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Deseja realmente excluir o projetor?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => remove(editProjetor.id)}>Sim</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Ver Projetores Disponíveis */}
                <div className="modal fade" id="modalVerProjetoresDisponiveis" tabIndex={-1} aria-labelledby="modalVerProjetoresDisponiveisLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title" id="modalVerProjetoresDisponiveisLabel">Projetores Disponíveis</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Status</th>
                                            <th scope="col">Marca</th>
                                            <th scope="col">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projetoresDisponiveis.map((projetor: any) => (
                                                <tr key={projetor.id}>
                                                    <td>{projetor.status}</td>
                                                    <td>{projetor.marca}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditarProjetor" onClick={() => setEditProjetor(projetor)}>
                                                            Agendar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Devolver */}
                <div className="modal fade" id="modalDevolver" tabIndex={-1} aria-labelledby="modalDevolverLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title" id="modalDevolverLabel">Devolver Projetor</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Deseja realmente devolver o projetor?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => devolver(editProjetor.id)}>Sim</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Main>
            <Footer />
        </Layout>
    );

};

export default App;