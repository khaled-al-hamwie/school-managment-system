import { ApiProperty } from "@nestjs/swagger";
import {
    IsNumber,
    IsOptional,
    IsPhoneNumber,
    IsPositive,
    Validate,
} from "class-validator";
import NameValidator from "src/core/common/validators/name.validator";
import { NumberSmallerThanValue } from "src/core/common/validators/number.smallerThanValue.validator";
import { BusAttributes } from "../interfaces/bus.interface";

export class CreateBusDto {
    @NameValidator(3, 45)
    name: BusAttributes["name"];

    @NameValidator(3, 45)
    bus_monitor_name: BusAttributes["bus_monitor_name"];

    @ApiProperty({ default: "0944332211" })
    @IsPhoneNumber("SY")
    bus_monitor_phone_number: BusAttributes["bus_monitor_phone_number"];

    @IsOptional()
    @NameValidator(10, 245)
    location_details?: BusAttributes["location_details"];

    @IsPositive()
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    semester_price: BusAttributes["semester_price"];

    @IsPositive()
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Validate(NumberSmallerThanValue, ["semester_price"])
    driver_fue: BusAttributes["driver_fue"];
}
