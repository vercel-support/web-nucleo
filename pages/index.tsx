import { Fragment } from 'react';
import Head from 'next/head';
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
} from 'antd';

import useRequest from '../libs/useRequest';

const FormItem = Form.Item;
const Option = Select.Option;

export const Home = (): JSX.Element => {
  const { data, error } = useRequest<string>({
    url: '/api/hello',
  });

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {error ? (
          <div>Failed to load</div>
        ) : !data ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            <h1 className="title">
              Hello <span>{data}</span>, welcome to{' '}
              <a href="https://nextjs.org">Next.js!</a>
            </h1>

            <p className="description">
              Get started by editing <code>pages/index.tsx</code>
            </p>

            <div style={{ width: '100%' }}>
              <Form layout="horizontal">
                <FormItem
                  label="Input Number"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 8 }}
                >
                  <InputNumber
                    size="large"
                    min={1}
                    max={10}
                    style={{ width: 100 }}
                    defaultValue={3}
                    name="inputNumber"
                  />
                  <a href="#">Link</a>
                </FormItem>

                <FormItem
                  label="Switch"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 8 }}
                >
                  <Switch defaultChecked />
                </FormItem>

                <FormItem
                  label="Slider"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 8 }}
                >
                  <Slider defaultValue={70} />
                </FormItem>

                <FormItem
                  label="Select"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 8 }}
                >
                  <Select
                    size="large"
                    defaultValue="lucy"
                    style={{ width: 192 }}
                  >
                    <Option value="jack">jack</Option>
                    <Option value="lucy">lucy</Option>
                    <Option value="disabled" disabled>
                      disabled
                    </Option>
                    <Option value="yiminghe">yiminghe</Option>
                  </Select>
                </FormItem>

                <FormItem
                  label="DatePicker"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 8 }}
                >
                  <DatePicker name="startDate" />
                </FormItem>
                <FormItem
                  style={{ marginTop: 48 }}
                  wrapperCol={{ span: 8, offset: 8 }}
                >
                  <Button size="large" type="primary" htmlType="submit">
                    OK
                  </Button>
                  <Button size="large" style={{ marginLeft: 8 }}>
                    Cancel
                  </Button>
                </FormItem>
              </Form>
            </div>
          </Fragment>
        )}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        .logo {
          height: 1em;
        }
        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Home;
