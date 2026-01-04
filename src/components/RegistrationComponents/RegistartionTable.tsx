export default function RegistrationTable() {
    const scheduleData = [
        { category: "Faculty", registration: "15,000 INR (incl. 18% GST)" },
        { category: "Ph. D. Students", registration: "6,000 INR (incl. 18% GST)" },
        { category: "Postdoctoral Fellows", registration: "9,000 INR (incl. 18% GST)" },
        { category: "Industrial Delegates", registration: "40,000 INR (incl.18% GST)" },
        { category: "Foreign Faculty", registration: "300 USD (incl. 18% GST)"}
    ];

    return (
        <div className="w-[80vw]"
            style={{
                maxWidth:"1280px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Registration</h2>
            <div className="overflow-x-auto pt-5">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead
                    style={{backgroundColor: "#b5dcff"}}
                    >
                        <tr>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Category
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Registration
                            </th>
                        </tr>
                    </thead>
                                    <tbody className="divide-y divide-gray-200 text-center">
                    {scheduleData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-800">
                            {item.category}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                            {item.registration}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
