import React from 'react';

function ProcessFile({ process }) {
    return (
        <>
            <div className={`absolute w-full bottom-[-14%]`}>
                <div className="mb-2 flex justify-between items-center">
                    <div className="flex items-center gap-x-3">
                        <span className="size-8 flex justify-center items-center">
                            <img src="/logo192.png" alt="" className={process === 100 ? '' : 'animate-spin'} />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-500">preline-ui.xls</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">7 KB</p>
                        </div>
                    </div>
                    {/* <div className="inline-flex items-center gap-x-2">
                        <a className="text-gray-500 hover:text-gray-800" href="#">
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                        </a>
                    </div> */}
                </div>

                <div className="flex items-center gap-x-3 whitespace-nowrap">
                    <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-950 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-950" style={{ width: `${process}%` }}></div>
                    </div>
                    <div className="w-6 text-end">
                        <span className="text-sm text-gray-800 dark:text-gray-500">{`${Math.round(process * 10) / 10} %`}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProcessFile;