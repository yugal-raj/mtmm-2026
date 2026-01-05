"use client"
import { usePathname, useRouter} from "next/navigation";
export default function HomepageImporatantDates() {
    const pathName = usePathname();
    const isImportantDates = pathName === "/importantDates";
    const scheduleData = [
        { activity: "Abstract submission starts", date: "October 10, 2026" },
        { activity: "Registration opens", date: "October 10, 2026" },
        { activity: "Abstract submission closes", date: "November 01, 2026" },
        { activity: "Registration closes", date: "November 05, 2026" },
    ];

    return (
        <div className="w-[80vw]"
            style={{
                maxWidth: isImportantDates? "1280px" : "1150px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Important Dates</h2>
            <div className="overflow-x-auto pt-5">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <tbody className="divide-y divide-gray-200 text-center">
                    {scheduleData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-800">
                            {item.activity}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                            {item.date}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
