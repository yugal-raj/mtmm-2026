const REGISTRATION_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeMNMlXIVdx0b5l3OzWVU396mxdWGaXnaxRUsuBYsXVGfJtWw/viewform?usp=header";
const ABSTRACT_TEMPLATE_URL =
    "https://docs.google.com/document/d/1Wx6EoNLavQlC8XzYQB7vlzN6e-C0M-ZU/edit?usp=drive_link&ouid=109534574149989060880&rtpof=true&sd=true";

export default function RegistrationTable() {
    const scheduleData = [
        { category: "Faculty", registration: "15,000 INR (incl. 18% GST)" },
        { category: "Ph. D. Students", registration: "6,000 INR (incl. 18% GST)" },
        { category: "Postdoctoral Fellows", registration: "9,000 INR (incl. 18% GST)" },
        { category: "Industrial Delegates", registration: "40,000 INR (incl. 18% GST)" },
        { category: "Foreign Faculty", registration: "INR 28,500 ≈ 300 USD (incl. 18% GST)" }
    ];

    const accountDetails = [
        { label: "Name of the Institute Account", value: "TEZPUR UNIVERSITY ENDOWMENT FUND ACCOUNT" },
        { label: "Name of the Account Holder", value: "REGISTRAR, TEZPUR UNIVERSITY" },
        { label: "Account Number", value: "10501585452" },
        { label: "Bank Name", value: "STATE BANK OF INDIA" },
        { label: "IFSC Code", value: "SBIN0014259" },
        { label: "PAN Number", value: "AAAJT2654F" }
    ];

    const linkButtonClass =
        "inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border-2 font-semibold text-center transition-all duration-200 hover:-translate-y-0.5";

    return (
        <div className="w-[80vw] pb-10"
            style={{
                maxWidth:"1280px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Registration</h2>

            <div className="flex flex-col gap-4 items-center pt-6 [&>a]:w-full [&>a]:sm:w-[380px]">
                <a
                    href={REGISTRATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkButtonClass} text-white shadow-md hover:shadow-lg`}
                    style={{ backgroundColor: "#2364b7", borderColor: "#2364b7" }}
                >
                    <svg aria-hidden="true" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                    </svg>
                    Registration &amp; Abstract Submission
                </a>
                <a
                    href={ABSTRACT_TEMPLATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkButtonClass} bg-white hover:bg-blue-50`}
                    style={{ color: "#2364b7", borderColor: "#2364b7" }}
                >
                    <svg aria-hidden="true" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />
                    </svg>
                    Download Abstract Template
                </a>
            </div>

            <h3 className="text-[24px] font-bold text-center pt-10"
                style={{"color":"#2364b7"}}
            >Registration Fee</h3>
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

            <h3 className="text-[24px] font-bold text-center pt-10"
                style={{"color":"#2364b7"}}
            >Account Details for Registration Fee Payment</h3>
            <div className="overflow-x-auto pt-5">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <tbody className="divide-y divide-gray-200">
                    {accountDetails.map((item) => (
                        <tr key={item.label} className="hover:bg-gray-50">
                        <th
                            scope="row"
                            className="px-6 py-4 text-left text-sm font-semibold text-gray-700 w-px sm:whitespace-nowrap"
                            style={{backgroundColor: "#b5dcff"}}
                        >
                            {item.label}
                        </th>
                        <td className="px-6 py-4 text-gray-800">
                            {item.value}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <h3 className="text-[24px] font-bold text-center pt-10"
                style={{"color":"#2364b7"}}
            >Instructions for Poster Presentation</h3>
            <ul className="list-disc pl-6 pt-5 space-y-2 text-gray-800 max-w-3xl mx-auto">
                <li>Maximum poster size is A0 size: 118 cm (height) x 84 cm (width)</li>
                <li>Board pins and double sided tape will be made available during poster setup</li>
            </ul>
        </div>
    );
}
