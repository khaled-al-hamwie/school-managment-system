import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntPagePipe implements PipeTransform {
    transform(value: any) {
        value = Number(value);
        if (!Number.isNaN(value) && Number.isInteger(value) && value >= 0)
            return value;
        return 0;
    }
}
