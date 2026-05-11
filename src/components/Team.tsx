"use client";

import ScrollHighlightText from "./ScrollHighlightText";

export default function MeetTheTeam() {
    const teamMembers = [
      {
        name: "Suleiman Misbau Safian",
        position: "Chief Executive Director",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Abdul Wahab Suleiman Ahmed",
        position: "General Manager",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
      },
      {
        name: "Nuratu Jibril",
        position: "Secretary General",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      },
    ];
  
    return (
      <div className="min-h-screen bg-[#ececec] px-5 py-16 md:px-12 lg:px-24">
        
        {/* Heading */}
        <div className="mb-14 text-center">
          <ScrollHighlightText className="text-xl font-[quicksand] font-bold text-gray-900 md:text-3xl">
            Meet The Team
          </ScrollHighlightText>
  
        
        </div>
  
        {/* Team Members */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="overflow-hidden transition"
            >
              {/* Image */}
              <div className="h-[300px] w-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
  
              {/* Text Below Image */}
              <div className="p-5 text-left">
                <h2 className="text-lg font-light font-[quicksand] text-gray-900">
                  {member.name}
                </h2>
  
                <p className="mt-2 text-md font-light font-[Aboreto]  text-accent">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }