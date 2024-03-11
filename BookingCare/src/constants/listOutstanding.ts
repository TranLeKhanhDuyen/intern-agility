import { IListOutstanding } from '@components/ListLink/ItemOutstanding/index';
import doctor1 from '@assets/doctors/kieu-dinh.png';
import doctor2 from '@assets/doctors/tra-anh-duy.jpg';
import doctor3 from '@assets/doctors/pham-chi-lang.jpg';
import doctor4 from '@assets/doctors/nguyen-van-lieu.jpg';
import doctor5 from '@assets/doctors/nguyen-tien-lang.png';
import doctor6 from '@assets/doctors/hua-thuy-vi.jpg';
import doctor7 from '@assets/doctors/nguyen-tien-thanh.png';
import doctor8 from '@assets/doctors/vu-thai-ha.jpg';
import doctor9 from '@assets/doctors/le-hong-anh.jpg';
import doctor10 from '@assets/doctors/nguyen-tuong-vu.png';
import doctor11 from '@assets/doctors/phan-vuong-huy.jpg';
import doctor12 from '@assets/doctors/nguyen-trong-hung.jpg';

export const LIST_OUTSTANDING: IListOutstanding[] = [
  {
    items: [
      {
        imagePath: doctor1,
        title: 'Associate Professor, Dr. Kieu Dinh Hung',
        describe: 'Neurology, Spine, Neurosurgery'
      },
      {
        imagePath: doctor2,
        title: 'Doctor, SpeciaList II Tra Anh Duy',
        describe: 'Andrology, Nephrology - Urology'
      },
      {
        imagePath: doctor3,
        title: 'Doctor, Doctor Pham Chi Lang',
        describe: 'Musculoskeletal, Orthopedic trauma'
      },
      {
        imagePath: doctor4,
        title: 'Associate Professor, PhD, Doctor Nguyen Van Lieu',
        describe: 'Nerve'
      },
      {
        imagePath: doctor5,
        title: 'Excellent Physicican, Doctor CKII Nguyen Tien Lang',
        describe: 'Diabetes - Endocrinilogy, Oncology, Thyroid'
      },
      {
        imagePath: doctor6,
        title: 'Master, Doctor Hua Thuy Vi',
        describe: 'Digestion, hepatitis'
      },
      {
        imagePath: doctor7,
        title: 'Specialist II Doctor Nguyen Tien Thanh',
        describe: 'Dermatology, Cosmetic dermatology'
      },
      {
        imagePath: doctor8,
        title: 'Doctor, Doctor Vu Thai Ha',
        describe: 'Dermatology, Cosmetic dermatology'
      },
      {
        imagePath: doctor9,
        title: 'Specialist Doctor I Nguyen Tuong Vu',
        describe: 'Neurology, Neurosurgery'
      },
      {
        imagePath: doctor10,
        title: 'SpeciaList Doctor I Phan Vuong Huy Dong',
        describe: 'Musculoskeletal, Orthopedic trauma'
      },
      {
        imagePath: doctor11,
        title: 'Associate Professor, PhD, Doctor Nguyen Trong Hung',
        describe: 'Nerve'
      },
      {
        imagePath: doctor12,
        title: 'Doctor, SpeciaList II Tra Anh Duy',
        describe: 'Andrology, Nephrology - Urology'
      }
    ],
    type: 'doctor'
  }
];
