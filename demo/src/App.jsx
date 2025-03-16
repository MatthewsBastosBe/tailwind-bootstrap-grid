import React from 'react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import GithubCorner from './GithubCorner';
import Direction from './Direction';
import About from './About.mdx';
import Demo from './Demo.mdx';
import theme from './theme';

function Editor(props) {
  const { children, className } = props;
  if (className === 'language-jsx') {
    return (
      <LiveProvider code={children.trim()} className="react-live">
        <LivePreview className="react-live__preview" />
        <LiveEditor
          dir="ltr"
          theme={theme}
          style={{
            fontFamily:
              "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontSize: 14,
          }}
          padding={24}
        />
        <LiveError className="react-live__error" dir="ltr" />
      </LiveProvider>
    );
  }
  return <code {...props} />;
}

Editor.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

function Link({ children, ...props }) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.string,
};

const components = { code: Editor, a: Link };

export default function App() {
  return (
    <>
      <GithubCorner />
      <div className="container">
        <About components={components} />
      </div>
      <hr className="m-1" />
      <div className="container">
        <Demo components={components} />
      </div>
      <Direction />
    </>
  );
}
