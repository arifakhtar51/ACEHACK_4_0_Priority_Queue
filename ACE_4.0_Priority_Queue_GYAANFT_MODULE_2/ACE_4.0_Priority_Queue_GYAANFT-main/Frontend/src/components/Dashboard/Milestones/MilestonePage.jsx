import React from 'react'
import Milestones from './Milestones'
import Sidebar from './Sidebar'

function MilestonePage() {
    return (

        <div className="w-full bg-white dark:bg-gray-800 h-full align-middle p-4">
                <div className="flex flex-col lg:flex-row h-full gap-4">
                    {/* Sidebar */}
                        <Sidebar />

                    {/* Main Content */}
                    <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col gap-4 h-[60vh] lg:h-full">
                        <div className="bg-gray-200 dark:bg-gray-900 rounded-3xl shadow-lg h-full p-6 transition-all hover:shadow-xl">
                            <Milestones />
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default MilestonePage