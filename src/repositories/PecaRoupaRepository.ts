import { EntityRepository, Repository } from "typeorm";

import PecaRoupa from "../models/PecaRoupa";

@EntityRepository(PecaRoupa)
class PecaRoupaRepository extends Repository<PecaRoupa> {

    public async findDate(date: Date): Promise<Array<PecaRoupa> | null> {
        const findPecaRoupa = await this.find({
            where: { data: date }
        })

        return findPecaRoupa || null;
    }

}

export default PecaRoupaRepository;
