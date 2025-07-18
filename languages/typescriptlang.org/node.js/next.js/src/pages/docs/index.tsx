/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{ spec: any }>(import('swagger-ui-react'), {
  ssr: false,
});

const DocsPage: NextPage = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="h-screen overflow-hidden bg-white">
      <SwaggerUI spec={spec} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: 'src/pages/api', // or 'src/pages/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Swagger API Example',
        version: '1.0',
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default DocsPage;
