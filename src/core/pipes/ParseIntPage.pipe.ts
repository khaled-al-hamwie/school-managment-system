import {
    ArgumentMetadata,
    ForbiddenException,
    Injectable,
    PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ParseIntPagePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        value = Number(value);
        if (!Number.isNaN(value) && Number.isInteger(value) && value >= 0)
            return value;
        throw new ForbiddenException("page must be a page number");
    }
}
