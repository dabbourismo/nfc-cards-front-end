export interface ClientPersonal {
    id?: number;

    username: string;
    password: string;

    name: string;
    nameIsHidden: boolean;

    email: string;
    emailIsHidden: boolean;

    city: string;
    cityIsHidden: boolean;

    district: string;
    districtIsHidden: boolean;

    title: string;
    titleIsHidden: boolean;

    company: string;
    companyIsHidden: boolean;

    address: string;
    addressIsHidden: boolean;

    phone: string;
    phoneIsHidden: boolean;

    describeYourself: string;
    describeYourselfIsHidden: boolean;

    youtubeEmbededURL: string;
    youtubeEmbededURLIsHidden: boolean;

    link?: string;
    serialNumber?: string;
}