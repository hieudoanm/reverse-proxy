/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from '@proxy/components/Divider';
import { Navbar } from '@proxy/components/Navbar';
import { NextPage } from 'next';
import { useState } from 'react';

export const INITIAL_OPEN_API = `openapi: 3.0.4
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing

paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        "200": # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
`;

const OpenAPI2PostmanV2Page: NextPage = () => {
  const [{ input = INITIAL_OPEN_API, output = '', loading = false }, setState] =
    useState<{
      input: string;
      output: string;
      loading: boolean;
    }>({
      input: INITIAL_OPEN_API,
      output: '',
      loading: false,
    });

  const handleConvert = async () => {
    setState((previous) => ({ ...previous, loading: true, output: '' }));

    try {
      const res = await fetch('/api/openapi/postmanv2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error ?? 'Unknown error');
      }

      const result = await res.json();
      setState((previous) => ({
        ...previous,
        output: JSON.stringify(result, null, 2),
      }));
    } catch (err: any) {
      setState((previous) => ({
        ...previous,
        output: `Error: ${err.message}`,
      }));
    } finally {
      setState((previous) => ({ ...previous, loading: false }));
    }
  };

  const handleDownload = () => {
    if (!output || output.startsWith('Error:')) return;

    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'postman_collection.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <Divider />
      <div className="flex h-full grow flex-col">
        <div className="grid grow grid-cols-2 divide-x divide-neutral-800">
          <div className="col-span-1 h-full">
            <textarea
              onChange={(event) =>
                setState((previous) => ({
                  ...previous,
                  input: event.target.value,
                }))
              }
              value={input}
              placeholder="Paste OpenAPI (JSON or YAML)"
              className="h-96 h-full w-full p-4 font-mono text-sm focus:outline-none"
            />
          </div>
          <div className="col-span-1 h-full">
            <textarea
              readOnly
              value={output}
              placeholder="Postman Collection v2"
              className="h-96 h-full w-full p-4 font-mono text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full border-t border-neutral-800" />
        <div className="grid grid-cols-2 gap-2 p-2 md:gap-4 md:p-4">
          <div className="col-span-1">
            <button
              className="w-full btn btn-primary"
              onClick={handleConvert}
              disabled={loading}>
              {loading ? 'Converting...' : 'Convert'}
            </button>
          </div>
          <div className="col-span-1">
            <button
              className="w-full btn btn-primary"
              onClick={handleDownload}
              disabled={!output || output.startsWith('Error:')}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenAPI2PostmanV2Page;
