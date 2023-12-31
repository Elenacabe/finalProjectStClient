import('./ErrorPage.css')

const ErrorPage = () => {
    return (
        <div className='Bodey'>
            <div className="error">
                <div className="wrap">
                    <div className="404">
                        <pre><code>
                            <span className="green">&lt;!</span><span>DOCTYPE html</span><span className="green">&gt;</span>
                            <span className="orange">&lt;html&gt;</span>
                            <span className="orange">&lt;style&gt;</span>

                            <span className="green">everything</span>:<span className="blue">awesome</span>;

                            <span className="orange">&lt;/style&gt;</span>
                            <span className="orange">&lt;/body&gt;</span>
                            ERROR 404!
                            FILE NOT FOUND!
                            <span className="comment">&lt;!--The file you are looking for,
                                is not where you think it is.--&gt;
                            </span>
                            <span className="orange"></span>
                        </code></pre>
                        <br />
                        <span className="info">
                            <br />
                            <span className="orange">&nbsp;&lt;/body&gt;</span>
                            <br />
                            <span className="orange">&lt;/html&gt;</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ErrorPage