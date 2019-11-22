import React from 'react'

const Footer = () => {
  return (
    <div data-cy="Footer">
      <div className="container">
        <a href="/" className="logo-font">conduit</a>
        <span className="attribution">
  {" "}An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </div>
  )
}

export default Footer
