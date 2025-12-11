
import { MDXComponents, MDXRemote, MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import React from "react";

const options: MDXRemoteOptions = {
	mdxOptions: {
		remarkPlugins: [remarkGfm]
	},
	parseFrontmatter: true,
}

const components: MDXComponents = {
  wrapper: ({ children }) => (
    <>
      <style>{styles}</style>
      <div className="mdx-container">{children}</div>
    </>
  ),
  
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => <h3 {...props} />,
  
  p: (props) => <p {...props} />,
  
  a: (props) => <a {...props} />,
  
  ul: (props) => <ul {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li {...props} />,
  
  code: ({ className, children, ...props}) => {
	const match = /language-(\w+)/.exec(className || "");
	const isCodeBlock = Boolean(match);

	return (<>
		{isCodeBlock ? 
			(<SyntaxHighlighter
				{...props}
				style={tomorrow}
				customStyle={{
					padding: "20px",
					fontSize: "14px",
					borderRadius: "8px",
					paddingRight: "50px",
				}}
				PreTag="pre"
				language={match ? match[1] : "javascript"}
				wrapLongLines={true}
			>
				{String(children).replace(/\n$/, "")}
			</SyntaxHighlighter>) 
			: (<code className={className} {...props}>{children}</code>)
		};
	</>)
  },
  pre: (props) => <div {...props} />,
  
//   pre: ({ children, ...props }) => {
//     // 获取代码内容并确保它是字符串
//     const codeContent = React.Children.toArray(children).find((child): child is React.ReactElement<{ className: string }> => 
//       React.isValidElement(child) && 'props' in child && 'className' in child.props && child.props.className.includes('language-')
//     );
    
//     const codeString = codeContent?.props?.children || '';
    
//     return (
//       <pre {...props}>
//         <SyntaxHighlighter
//           style={tomorrow}
//           customStyle={{
//             margin: 0,
//             padding: '1rem',
//             backgroundColor: '#2d2d2d',
//             fontSize: '14px',
//           }}
//           language={codeContent?.props?.className?.replace('language-', '')}
//         >
//           {String(codeString)}
//         </SyntaxHighlighter>
//       </pre>
//     );
//   },
  
  hr: (props) => <hr {...props} />,
  
  CustomBlock: ({ children, title }) => (
    <div className="custom-block">
      {title && <div className="custom-block-title">{title}</div>}
      {children}
    </div>
  ),
};

interface MdxProps {
	markdown: string;
}
async function MdxComponent({ markdown }: MdxProps) {
	return (
		<MDXRemote source={markdown} options={options} components={components} />
	);
}

export default MdxComponent;

const styles = `
  .mdx-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .mdx-container h1 {
    font-size: 2.5rem;
    margin: 2rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #eaeaea;
  }

  .mdx-container h2 {
    font-size: 2rem;
    margin: 1.5rem 0 0.75rem;
  }

  .mdx-container h3 {
    font-size: 1.5rem;
    margin: 1.25rem 0 0.5rem;
  }

  .mdx-container p {
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .mdx-container a {
    color: #0066cc;
    text-decoration: underline;
  }

  .mdx-container a:hover {
    color: #004499;
  }

  .mdx-container ul, .mdx-container ol {
    padding-left: 2rem;
    margin-bottom: 1rem;
  }

  .mdx-container li {
    margin-bottom: 0.5rem;
  }

  .mdx-container code {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
  }

  .mdx-container pre {
    margin: 1rem 0;
    border-radius: 8px;
    overflow: auto;
  }

  .mdx-container hr {
    border: none;
    border-top: 1px solid #eaeaea;
    margin: 2rem 0;
  }

  .custom-block {
    background-color: #f0f7ff;
    border-left: 4px solid #0066cc;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
  }

  .custom-block-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;
