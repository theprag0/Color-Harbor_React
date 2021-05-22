import React from 'react';
import './styles/page.css';

function Page({children}) {
    return (
        <section className="page">{children}</section>
    );
};

export default Page;