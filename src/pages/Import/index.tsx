import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';
import MessageComponent from '../../components/Messages';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}
interface MessageProps {
  type: 'success' | 'error';
  value: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const [message, setMessage] = useState<MessageProps>({
    type: 'success',
    value: '',
  });
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    uploadedFiles.map(file => data.set('file', file.file, file.name));

    try {
      await api.post('/transactions/import', data);
      setUploadedFiles([]);
      setMessage({
        type: 'success',
        value: 'Arquivo importado com sucesso.',
      });
    } catch (err) {
      setMessage({
        type: 'error',
        value: 'Falha ao importar o arquivo.',
      });
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const fileProps = files.map(file => {
      return {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };
    });
    setUploadedFiles(fileProps);
  }

  return (
    <>
      <Header size="small" selected={history.location.pathname} />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />

          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          {!!message.value && (
            <MessageComponent type={message.type} value={message.value} />
          )}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
