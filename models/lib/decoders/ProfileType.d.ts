import * as t from 'io-ts';
export declare const ProfileType: t.TypeC<{
    _id: t.StringC;
    firstName: t.StringC;
    lastName: t.StringC;
    venmoId: t.UnionC<[t.StringC, t.UndefinedC]>;
    venmoVenmo: t.UnionC<[t.StringC, t.UndefinedC]>;
}>;
