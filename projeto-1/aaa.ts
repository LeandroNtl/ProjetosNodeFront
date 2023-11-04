const [dados, setDados] = useState([]);

  const [erro, setErro] = useState(null as null | string);

  const getProjetores = async () => {
    try {
      const response = await axios.get(`${apiURL}/projetores`);
      setDados(response.data);
      setErro(null);
    } catch (error) {
      setErro("Ocorreu um erro ao buscar os projetores");
    }
  }

  useEffect(() => {
    getProjetores();
  }, []);

<table>
          <thead>
            <tr>
              <th>id</th>
              <th>status</th>
              <th>marca</th>
              <th>usuario</th>
              <th>data</th>
              <th>hora</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((projetor: any) => (
              <tr key={projetor.id}>
                <td>{projetor.id}</td>
                <td>{projetor.status}</td>
                <td>{projetor.marca}</td>
                {projetor.agendamento ? (
                  <>
                    <td>{projetor.agendamento.usuario}</td>
                    <td>{projetor.agendamento.dataAgendamento}</td>
                    <td>{projetor.agendamento.horaAgendamento}</td>
                  </>
                ) : (
                  <>
                    <td>-</td>
                    <td>-</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>