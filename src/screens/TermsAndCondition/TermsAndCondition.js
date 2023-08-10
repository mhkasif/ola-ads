import CustomText from '@components/CustomText/CustomText';
import {useNavigation} from '@react-navigation/native';
import {Box, Center, Heading, ScrollView} from 'native-base';
import React from 'react';
import {SCREEN_NAMES} from 'screens/screenNames';

const TermsAndCondition = () => {
  const {navigate, ...navigation} = useNavigation();
  return (
    <ScrollView>
      <Box h="100%" w="100%" py={5} px={2}>
        <CustomHeading my={2} size="lg">
          Terms and Conditions for Ola-Ads App
        </CustomHeading>
        <Box ml={2}>
          <Box>
            <CustomHeading>1. Agreement</CustomHeading>
            <CustomText>
              These Terms and Conditions ("Agreement") govern your use of the
              Ola-Ads mobile application ("App") provided by Ola Entertainment
              LTD ("Company," "we," "us," or "our"). By accessing or using the
              App, you agree to be bound by this Agreement.
            </CustomText>
          </Box>
          <Box>
            <CustomHeading>2. Acceptance of Terms</CustomHeading>
            <CustomText>
              By accessing and using the App, you acknowledge that you have
              read, understood, and agree to be bound by this Agreement and any
              additional guidelines or rules applicable to specific features or
              services provided within the App.
            </CustomText>
          </Box>
          <Box>
            <CustomHeading>3. User Responsibilities</CustomHeading>
            <Box mx={2}>
              <CustomHeading size="sm">3.1. Account Registration</CustomHeading>
              <CustomText>
                To access certain features or services within the App, you may
                be required to create an account. You must provide accurate and
                complete information during the registration process and keep
                your account credentials secure. You are responsible for all
                activities that occur under your account.
              </CustomText>
              <CustomHeading size="sm">
                3.2. Prohibited Activities
              </CustomHeading>
              <CustomText>
                You agree not to engage in any of the following activities while
                using the App:
              </CustomText>
              <Box mx={2}>
                <CustomText>
                  3.2.1. Violating any applicable laws, regulations, or
                  third-party rights. 3.2.2. Attempting to gain unauthorized
                  access to the App or any related systems or networks. 3.2.3.
                  Interfering with or disrupting the functionality or security
                  of the App. 3.2.4. Uploading or transmitting any harmful or
                  malicious content, including viruses or malware. 3.2.5.
                  Engaging in any fraudulent, deceptive, or harmful activities.
                  3.2.6. Prohibited activities include, but are not limited to:
                </CustomText>
                <Box mx={2}>
                  {[
                    'Posting or sharing illegal, infringing, or obscene content.',
                    'Impersonating another individual or entity.',
                    'Collecting or harvesting personal information of others without their consent.',
                    'Engaging in spamming or unauthorized advertising.',
                    'Breaching the intellectual property rights of the Company or third parties.',
                  ].map(x => (
                    <CustomText key={x}>{`\u25AA ${x}`}</CustomText>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <CustomHeading>4. Intellectual Property</CustomHeading>
            <CustomText>
              The App and its content, including but not limited to text,
              graphics, images, logos, and software, are owned by Ola
              Entertainment LTD and protected by intellectual property laws. You
              explicitly agree not to:
            </CustomText>
            <Box ml={2}>
              <CustomText>
                4.1. Reproduce, copy, or modify the App or any portion of its
                content without prior written consent from Ola Entertainment
                LTD. 4.2. Distribute, display, or publish any part of the App or
                its content without prior written consent from Ola Entertainment
                LTD. 4.3. Use any data mining, scraping, or similar data
                gathering methods to extract information from the App.
              </CustomText>
            </Box>
          </Box>
          <Box>
            <CustomHeading>5. Privacy Policy</CustomHeading>
            <CustomText>
              By using the App, you agree to the collection, use, and disclosure
              of personal information as described in Ola Entertainment LTD's
              Privacy Policy. The Privacy Policy outlines how Ola Entertainment
              LTD handles and protects user data in compliance with the UK
              General Data Protection Regulation (UK GDPR) and other applicable
              data protection laws.
            </CustomText>
            <Box ml={2}>
              <CustomHeading>
                Ola Entertainment LTD's Privacy Policy:
              </CustomHeading>
              <CustomText>
                5.1 The types of personal information we collect from users,
                such as name, email address, and demographic information.
              </CustomText>
              <CustomText>
                5.2. How we use and process the collected information, including
                for account management, service improvement, and personalized
                advertising.
              </CustomText>
              <CustomText>
                5.3. The legal basis for processing user data under the UK GDPR
                and other applicable data protection laws.
              </CustomText>
              <CustomText>
                5.4. The measures we have in place to protect user data from
                unauthorized access, disclosure, or alteration.
              </CustomText>
              <CustomText>
                5.5. How long we retain user data in accordance with our legal
                obligations.
              </CustomText>
              <CustomText>
                5.6. User rights and choices regarding their personal
                information, including the ability to access, update, or delete
                their data.
              </CustomText>
              <CustomText>
                5.7. How users can contact Ola Entertainment LTD with inquiries
                or concerns about their privacy or data protection.
              </CustomText>
            </Box>
          </Box>
          <Box>
            <CustomHeading>
              6. Disclaimers and Limitations of Liability
            </CustomHeading>
            <Box ml={2}>
              <CustomHeading size="sm">6.1. Warranty Disclaimer</CustomHeading>
              <CustomText>
                The App is provided on an "as is" and "as available" basis
                without warranties of any kind, whether express or implied. Ola
                Entertainment LTD does not guarantee that the App will be
                uninterrupted, error-free, or free from viruses or other harmful
                components.
              </CustomText>
              <CustomHeading size="sm">
                6.2. Limitation of Liability
              </CustomHeading>
              <CustomText>
                To the maximum extent permitted by law, Ola Entertainment LTD
                shall not be liable for any direct, indirect, incidental,
                consequential, or exemplary damages arising from your use of the
                App, even if Ola Entertainment LTD has been advised of the
                possibility of such damages.
              </CustomText>
            </Box>
          </Box>
          <Box>
            <CustomHeading>7. Maintenance</CustomHeading>
            <CustomText>
              Ola Entertainment LTD reserves the right to upgrade the server
              infrastructure for the App. This may result in temporary downtime
              of the website or app for a few hours. Ola Entertainment LTD is
              not responsible for any inconvenience or losses incurred during
              such maintenance periods.
            </CustomText>
          </Box>

          <Box>
            <CustomHeading>8. Indemnification</CustomHeading>
            <CustomText>
              You agree to indemnify and hold Ola Entertainment LTD and its
              officers, directors, employees, and affiliates harmless from any
              claims, losses, damages, liabilities, and expenses arising out of
              your use of the App, violation of this Agreement, or infringement
              of any third-party rights.
            </CustomText>
          </Box>
          <Box>
            <CustomHeading>9. Modification and Termination</CustomHeading>
            <CustomText>
              Ola Entertainment LTD reserves the right to modify, suspend, or
              terminate the App or any part thereof at any time without prior
              notice. Ola Entertainment LTD may also update or modify this
              Agreement from time to time, and your continued use of the App
              after any changes will constitute your acceptance of the modified
              Agreement.
            </CustomText>
          </Box>
          <Box>
            <CustomHeading>
              10. Governing Law and Dispute Resolution
            </CustomHeading>
            <CustomText>
              This Agreement shall be governed by and construed in accordance
              with the laws of Jurisdiction. Any disputes arising out of or
              relating to this Agreement shall be resolved through negotiation
              or alternative dispute resolution methods agreed upon by both
              parties.
            </CustomText>
          </Box>
        </Box>
      <Center>
        <CustomText
        my={2}
          textDecorationLine="underline"
          textDecoration="underline"
          onPress={() => navigate(SCREEN_NAMES.CONTACT)}>
          Contact Us
        </CustomText>
      </Center>
      </Box>
    </ScrollView>
  );
};

export default TermsAndCondition;
const CustomHeading = ({children, size = 'md'}) => {
  return (
    <Heading my={2} size={size}>
      {children}
    </Heading>
  );
};
