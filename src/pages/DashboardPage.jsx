import { DashBoard, KPIs, PinkBox } from "../style/DashBoardStyled"
import { IoBedOutline } from "react-icons/io5";
import { TbCalendarCheck } from "react-icons/tb";
import { BsBoxArrowInLeft, BsBoxArrowInRight } from "react-icons/bs";

function Dashboard() {
    return (
        <DashBoard>
            <KPIs>
                <div>
                    <PinkBox>
                        <IoBedOutline size={26} />
                    </PinkBox>
                    <div>
                        <h6>8,461</h6>
                        <p>New Booking</p>
                    </div>
                </div>
                <div>
                    <PinkBox>
                        <TbCalendarCheck size={26} />
                    </PinkBox>
                    <div>
                        <h6>963</h6>
                        <p>Scheduled Room</p>
                    </div>
                </div>
                <div>
                    <PinkBox>
                        <BsBoxArrowInRight size={26} />
                    </PinkBox>
                    <div>
                        <h6>753</h6>
                        <p>Check In</p>
                    </div>

                </div>
                <div>
                    <PinkBox>
                        <BsBoxArrowInLeft size={26} />
                    </PinkBox>
                    <div>
                        <h6>516</h6>
                        <p>Check Out</p>
                    </div>

                </div>
            </KPIs>
        </DashBoard>
    )
}

export default Dashboard