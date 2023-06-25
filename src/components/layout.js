import * as React from "react"
import { Link } from "gatsby"
import { FaEye } from 'react-icons/fa';

const Layout = ({ location, title, children, totalViews = 0 }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer
        style={{
          marginTop: 5,
          paddingTop: 5,
        }}
      >
        <div className="global-footer">
          <a
            href="https://github.com/cuonghx1108"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>{' '}
          &bull;{' '}
          <a
            href="https://stackoverflow.com/users/12280838/0xcuonghx"
            target="_blank"
            rel="noopener noreferrer"
          >
            stack overflow
          </a>
          <div className="global-total-views">
            <span style={{ marginRight: 5, marginTop: 8 }}><FaEye /></span>
            {totalViews}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
