import { useNavigate, useSearchParams } from "react-router-dom";

const schools = ["All", "KNUST", "Legon", "UCC", "UDS", "UHAS"];

export function SchoolFilter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedSchool = searchParams.get("school") || "All";

  const handleSelect = (school: string) => {
    if (school === "All") {
      navigate("/");
    } else {
      navigate(`/?school=${school}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center py-4">
      {schools.map((school) => {
        const isActive = selectedSchool === school;

        return (
          <button
            key={school}
            onClick={() => handleSelect(school)}
            className={`
              px-4 py-2 text-sm border transition
              ${isActive ? "bg-primary text-white" : "border-border"}
            `}
          >
            {school}
          </button>
        );
      })}
    </div>
  );
}