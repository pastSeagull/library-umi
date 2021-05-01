import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
      <DefaultFooter
        links={[
          { key: 'test', title: 'GitHub', href: 'https://github.com/pastSeagull' },
        ]}
        copyright="Gaviota"
      />
);
