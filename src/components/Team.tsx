"use client";

import ScrollHighlightText from "./ScrollHighlightText";

export default function MeetTheTeam() {
    const teamMembers = [
      {
        name: "Suleiman Misbau Safian",
        position: "Chief Executive Director",
        image:
        "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778622057/smsstaff2_ecfjhm.jpg"      },
      {
        name: "Abdul Wahab Suleiman Ahmed",
        position: "General Manager",
        image:
        "https://res.cloudinary.com/dvsdcgu9q/image/upload/v1778622057/smsstaff1_tcpivx.jpg"      },
      {
        name: "Rasa Simone ",
        position: "Secretary General",
        image:
        "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778752268/smsstaff3_huam7s.jpg" }   ];
  
    return (
      <div className="min-h-screen bg-background px-5 py-16 md:px-12 lg:px-24">
        
        {/* Heading */}
        <div className="mb-14 text-center">
          <ScrollHighlightText className="text-xl font-[quicksand] font-semibold text-gray-900 md:text-3xl">
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
                <h2 className="text-lg font-medium font-[quicksand] text-gray-700">
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