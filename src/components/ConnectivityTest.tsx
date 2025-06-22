import React, { useState } from 'react';
import { Button, Card, Space, Alert, Spin, Typography, Collapse, Tag, Progress } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ApiOutlined, ReloadOutlined } from '@ant-design/icons';
import { runConnectivityCheck } from '../utils/connectivityChecker';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export const ConnectivityTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleTest = async () => {
    setLoading(true);
    try {
      const testResults = await runConnectivityCheck();
      setResults(testResults);
    } catch (error) {
      console.error('Error durante la prueba:', error);
      setResults({
        error: 'Error al ejecutar las pruebas de conectividad',
        details: error
      });
    } finally {
      setLoading(false);
    }
  };

  const getOperationIcon = (status: string) => {
    return status === 'success' ? 
      <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
      <CloseCircleOutlined style={{ color: '#f5222d' }} />;
  };

  const getOperationTag = (operation: string) => {
    const colors: Record<string, string> = {
      'GET_LIST': 'blue',
      'GET_ONE': 'cyan',
      'CREATE': 'green',
      'UPDATE': 'orange',
      'DELETE': 'red'
    };
    return <Tag color={colors[operation] || 'default'}>{operation}</Tag>;
  };

  return (
    <Card title={
      <Space>
        <ApiOutlined />
        <span>Prueba de Conectividad Frontend-Backend</span>
      </Space>
    }>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert
          message="Información"
          description="Esta herramienta verifica la conectividad entre el frontend y el backend, probando todas las operaciones CRUD en cada recurso."
          type="info"
          showIcon
        />

        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={handleTest}
          loading={loading}
          size="large"
        >
          Ejecutar Prueba de Conectividad
        </Button>

        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin size="large" />
            <p>Ejecutando pruebas de conectividad...</p>
          </div>
        )}

        {results && !loading && (
          <>
            {results.error ? (
              <Alert
                message="Error en las pruebas"
                description={results.error}
                type="error"
                showIcon
              />
            ) : (
              <>
                <Card>
                  <Title level={4}>Resumen de Resultados</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>API URL: <code>{results.apiUrl}</code></Text>
                    <Text>Timestamp: {new Date(results.timestamp).toLocaleString()}</Text>
                    
                    {results.summary && (
                      <>
                        <Progress
                          percent={parseFloat(results.summary.successRate)}
                          status={results.summary.failedTests === 0 ? 'success' : 'exception'}
                        />
                        <Space>
                          <Text>Total de pruebas: {results.summary.totalTests}</Text>
                          <Text type="success">Exitosas: {results.summary.passedTests}</Text>
                          <Text type="danger">Fallidas: {results.summary.failedTests}</Text>
                        </Space>
                      </>
                    )}
                  </Space>
                </Card>

                <Collapse>
                  {results.tests.map((test: any, index: number) => (
                    <Panel
                      key={index}
                      header={
                        <Space>
                          {test.resource && <Text strong>{test.resource}</Text>}
                          {test.name && <Text strong>{test.name}</Text>}
                          {test.status && getOperationIcon(test.status)}
                        </Space>
                      }
                    >
                      {test.operations ? (
                        <Space direction="vertical" style={{ width: '100%' }}>
                          {test.operations.map((op: any, opIndex: number) => (
                            <div key={opIndex}>
                              <Space>
                                {getOperationTag(op.operation)}
                                {getOperationIcon(op.status)}
                                {op.count !== undefined && <Text>({op.count} registros)</Text>}
                                {op.id && <Text type="secondary">ID: {op.id}</Text>}
                                {op.error && <Text type="danger">{op.error}</Text>}
                              </Space>
                            </div>
                          ))}
                        </Space>
                      ) : (
                        <pre>{JSON.stringify(test, null, 2)}</pre>
                      )}
                    </Panel>
                  ))}
                </Collapse>

                {results.errors.length > 0 && (
                  <Alert
                    message="Errores Encontrados"
                    description={
                      <ul>
                        {results.errors.map((error: any, index: number) => (
                          <li key={index}>
                            <Text type="danger">{error.name}: {error.error}</Text>
                          </li>
                        ))}
                      </ul>
                    }
                    type="error"
                    showIcon
                  />
                )}
              </>
            )}
          </>
        )}
      </Space>
    </Card>
  );
};
